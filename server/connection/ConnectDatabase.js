const mongoose = require('mongoose');

const connectMongoose=(path)=>{
    return mongoose.connect(path);
}

module.exports={
    connectMongoose
}