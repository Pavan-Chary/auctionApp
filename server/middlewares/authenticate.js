const {getUser} = require('../services/auth.js');
const { Users, Auctions } = require('../models/auctionApp.js');

async function authenticate(req,res,next){
    const token = req.headers.authorization;
    console.log(token);
    const user = getUser(token);
    if(user){
        res.user=user;
    }
    else{
        console.log("Sent back...");
        return res.json({msg:"Please login"});
    }
    next();
}
async function getCreatedBy(AuctionId){
    try{
    await Auctions.findById(AuctionId).then((res)=>{
        if(res){
            return res.createdBy
        }
        return null;
    });
    }
    catch{
        return null
    }
    
}

module.exports={
    authenticate,
    getCreatedBy
}