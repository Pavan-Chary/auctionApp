const {setUser, getUser} = require('../services/auth.js');
const {Users, Auctions}= require("../models/auctionApp.js")

async function loginHandle(req,res){

    const email=req.body.email;
    console.log(req.headers);
    let user = await Users.findOne({email});
    if(user){
        console.log(user);
        const token = setUser(user);
        return res.json({code:1,msg:"Successfully logged in", token:token})
    }
    return res.json({code:0,msg:"Invalid"});
    
}

async function signinHandle(req,res){
    let flag=0;
    const person = req.body;
    await Users.create({
        name:person.name,
        email:person.email,
        password:person.password
    }).then(()=>{flag=1; console.log("User created...\n", person)}).catch(()=>{console.log("Error in creating user..")})
    if(flag==1)return res.json({msg:"Success"})
    return res.json({msg:"User Already Exists"});
}
 
async function logoutHandle(req,res){
    console.log(res.user);
    return res.json({msg:"Got"});
}

async function homePage(req,res){
    return res.json({msg:"Welcome GURU..."})
}

async function createAuction(req, res){

    const data = req.body;
    const name = data.name;
    const description = data.description;
    const startPrice = data.price;
    const createdBy = res.user.id;
    const time = data.time;

    flag=0;
    await Auctions.create(
        {name, description,startPrice,createdBy,status:0,time}
    ).then(()=>{console.log("Succesfully");flag=1;}).catch(()=>{console.log("Error in connecting creating..."); return res.json({code:0,msg:"Error"})});
    let ret;
    await Auctions.find({name:name,description:description,createdBy:res.user.id}).then((use)=>ret=use[use.length-1]._id);
    console.log(ret);
    if(flag==1){
        return res.json({code:1,msg:"Created Succesfully", auctionId:ret});
    }
}
async function updateValues(auctionId, userId, amount){
    await Auctions.updateOne({_id:auctionId,'people.id':userId},{$set:{'people.$.amount':amount}});
    
}
async function endAuction(auctionId){
    await Auctions.updateOne({_id:auctionId},{$set:{status:2}})
}
async function startAuction(auctionId){
    console.log("did you call me");
    await Auctions.updateOne({_id:auctionId},{$set:{status:1, startTime:new Date().getTime() }})
}
async function addPeople(auctionId, userId, userName){
    
    const currentAuction = await Auctions.findById(auctionId);
    currentAuction.people.push({name:userName,id:userId,amount:0});
    currentAuction.save();
    console.log("added to the people of auction")
}
async function getRequestedList(req,res){
    const userId=req.query.userId;
    const user = await Users.findById(userId)
    return res.json({code:1,people:user.people});  
}
async function sendUserDetails(req, res){
    const token = req.query.token;
    const user=getUser(token);
    if(user){
        console.log(user)
        const people = await Users.findById(user.id);
        return res.json({code:1,user:user,people:people.people}); 
    }
    return res.json({code:0})   
}

// to retrive acuctions list
async function getMyAuctions(req, res){
    const userid = req.query.user;
    if(userid!==""){
        const auction = await Auctions.find({createdBy:userid});
        return res.json({code:1,auctions:auction})
    }
    else{
        return res.json({code:1,people:[]})
    }
}

//to get participants of an auction
async function getAuctionParticipants(req,res){
    const auctionId = req.query.id;
    try{
        const auction = await Auctions.findById(auctionId)
        return res.json({code:1, auction:auction})
    }catch{
        return res.json({code:0,msg:"Please enter a valid code"})
    }
}



module.exports={
    loginHandle,
    logoutHandle,
    signinHandle,
    homePage,
    createAuction,
    addPeople,
    updateValues,
    endAuction,
    startAuction,
    sendUserDetails,
    getRequestedList,
    getMyAuctions,
    getAuctionParticipants,
}
