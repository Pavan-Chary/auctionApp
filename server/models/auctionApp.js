const mongoose = require('mongoose');

const PeopleSchema = new mongoose.Schema({
    name: String,
    id: mongoose.Schema.Types.ObjectId,
    auctionId: mongoose.Schema.Types.ObjectId,
    auctionName: String
});

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    people:{
        type:[PeopleSchema],    
    }

});
const AuctionSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String
    },
    status:{
        type:Number,
        default:0,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    },
    startPrice:{
        type:Number,
        required:true,
    },
    people:{
        type:[{
            name:String,
            id:mongoose.Schema.Types.ObjectId,
            amount:Number,
        }],  
        unique:true,  
    },
    time:{
        type:Number,
        required:true,
    },
    startTime:{
        type:Number,
        default:0,
    },
});

const Users=mongoose.model("users",UserSchema);
const Auctions=mongoose.model("auctions",AuctionSchema);

module.exports={
    Users,
    Auctions
}