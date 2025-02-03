const jwt = require('jsonwebtoken');
const secretKey = "pavan@&$";
const setUser=(user)=>{
    const payload={
        id:user._id,
        name:user.name
    }
    const token = jwt.sign(payload, secretKey);
    return token;
}

const getUser=(token)=>{
    try{
        const user = jwt.verify(token, secretKey);
        return user;
    }
    catch{
        return null;
    }
}

module.exports={
    setUser,
    getUser
}