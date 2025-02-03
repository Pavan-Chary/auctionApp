const http = require('http');
require('dotenv').config(); 
const mongoose = require('mongoose');
const socket = require('socket.io');
const express = require('express');
const cors = require('cors');
const {routes, routesAuction} = require('./routes/auctionApp.js');
const {authenticate, getCreatedBy} = require('./middlewares/authenticate.js');
const {connectMongoose} = require('./connection/ConnectDatabase.js');
const { addPeople,updateValues,endAuction,startAuction,} = require('./controllers/auctionApp.js');
const { Users, Auctions } = require('./models/auctionApp.js');
const app = express();
const path = require('path');
const server = http.createServer(app);
const io = socket(server,{
    cors:{
        origin:"*",
    }
});

async function acceptPeople(auctionId, userId, userName,auctionName,creatorId){
    
    const currentAuction = await Users.findById(creatorId);
    currentAuction.people.pull({name:userName,id:userId,auctionId:auctionId,auctionName:auctionName});
    currentAuction.save();
}
async function checkOnce(auctionId){
    const auction = await Auctions.findById(auctionId);
    const sTime = auction.startTime;
    const t = auction.time;
    const eTime = sTime+2*t*60*1000;
    const hTime = sTime+t*60*1000;
    console.log(new Date().getTime());
    if(hTime>=new Date().getTime())return 1;
    else if(eTime>new Date().getTime())return 2;
    else {
        endAuction(auctionId)
        return 0;
    }
}

async function updateTime(auctionId){
    const currentAuction = await Auctions.updateOne({_id:auctionId},
        {$set:{startTime:new Date().getTime()}}
    );
}

async function bidValueUpdate(auctionId, userId, userName, auctionName, amount){
    console.log("This is value ",auctionId, userId, userName,auctionName, amount);
    const currentAuction = await Auctions.findById(auctionId);
    let flag=0;
    if(currentAuction.status===0){
        return 2;
    }
    if(currentAuction.status===2){
        return 3;
    }
    console.log("amount value");
    if(currentAuction.startPrice>=amount)return 0;
    currentAuction.people.map((pep)=>{
        console.log(pep.amount,"  ",amount);
        if(pep.amount>=amount){
                flag=1;
        }
        
    });
    if(flag==1){
        return 0;
    }
    //currentAuction.people.pull({name:userName,id:userId});
    currentAuction.people=currentAuction.people.filter((pep)=>{  
        console.log(pep.id,userId);
        console.log(pep.name,userName);
        let id=pep.id;
        //console.log(JSON.stringify(id));
        if(pep.name===userName && JSON.stringify(id)===JSON.stringify(userId)){
            console.log("Matched...")
        }
        else{
            return true;
        }  
    });
    currentAuction.people.push({name:userName,id:userId,amount:amount});
    currentAuction.save();
    return 1; 
    
}

io.on("connection",(socket)=>{
    console.log("Connected on socket id...",socket.id);
    socket.on("AddPerson",(payload)=>{
        console.log(payload);
        try{
            Auctions.findById(payload.auctionId).then((res)=>{
                if(res){
                    if(res.status==2){
                        io.emit(`messageTo${payload.userId}`,{code:0,msg:"Auction has already ended"});
                    }else{
                    const currentList = Users.findById(res.createdBy).then((resp)=>{
                        resp.people.push({name:payload.userName, id:payload.userId, auctionId:payload.auctionId, auctionName:res.name});
                        console.log(resp.people)
                        resp.save();
                    })
                    io.emit(`addRequest${res.createdBy}`,{
                        auctionName:res.name,auctionId:payload.auctionId,name:payload.userName, id:payload.userId
                    });
                    }
                }else{
                console.log("Found not")
                io.emit(`messageTo${payload.userId}`,{code:0,msg:"Please give valid code"});
                }
            });
        }
        catch{
            console.log("Found not")
            socket.emit(`messageTo${payload.userId}`,{code:0,msg:"Please give valid code"})
        } 
    });
    socket.on("UserAccept",(payload)=>{
        const val = payload.data
        console.log(typeof val.id)
        const creatorId=payload.user;
        const userId=val.id;
        const auctionId=val.auctionId;
        const name=val.name;
        const auctionName=val.auctionName;
        acceptPeople(auctionId,userId, name, auctionName,creatorId);
        addPeople(auctionId,userId,name)
        io.emit(`getNewRequests${payload.user}`,{msg:"done"}) 
        console.log(`sent a message to getNewParticipants${auctionId}`)
        io.emit(`getNewParticipants${auctionId}`)
    })

    //on receiving start command for auction
    socket.on("startAuction",(payload)=>{
        startAuction(payload.id);
        io.emit(`getNewAuctions${payload.user}`)
        const intId = setInterval(()=>{
            checkOnce(payload.id).then(res=>{
                console.log("Hello I am caled...",res);
                if(res==1){
                    io.emit(`timeUpdate${payload.id}`,{code:1,msg:"First"})
                }else if(res==2){
                    io.emit(`timeUpdate${payload.id}`,{code:2,msg:"Second"})
                }else{
                    io.emit(`timeUpdate${payload.id}`,{code:3,msg:"Closed"})
                    clearInterval(intId);
                }
            })
        },1000);
    })

    //To update bidding
    socket.on("bidAmount",(payload)=>{
        bidValueUpdate(payload.auction._id,payload.user.id,payload.user.name,payload.auction.name,payload.amount).then(res=>{
            if(res==0){
                io.emit(`bidAmountUpdate${payload.user.id}`,{code:0,msg:"Your value should be greater than higest value"})
            }
            else if(res==2){
                socket.emit(`messageTo${payload.user.id}`,{code:0,msg:"Please hold on AUction not yet started"})
            }
            else if(res==3){
                socket.emit(`messageTo${payload.user.id}`,{code:0,msg:"Auction has ended"})
                console.log("DONe")
            }
            else{
                updateTime(payload.auction._id)
                io.emit(`bidAmountUpdate${payload.user.id}`,{code:1,msg:"Updated Successfully"});
                io.emit(`getNewParticipants${payload.auction._id}`);
            }
        });    
    });

    //to start
});
const dbUrl = process.env.DB_HOST;
connectMongoose(dbUrl).then(()=>console.log("Connected to Database...")).catch((err)=>console.log("Trouble at database connection..."+err));
/* app.use(cors({
    origin: '*', // Replace with your React app's origin
    credentials: true // Allow sending cookies
})); */
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'build')));
app.use('/api/createAuction',authenticate,routesAuction);
app.use('/api',routes);
app.get('/*/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
const port = process.env.PORT || 8000;
server.listen(port, ()=>console.log("server listening at PORT:8000"))
