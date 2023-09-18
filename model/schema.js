const mongoose = require("mongoose");
const userSchema= new mongoose.Schema({
    userid:{
        type:String,
        trim:true
    },
    userAddress:{
        type:String,
        unique:true,
        default:null,
        trim:true
    },
    
    
},{timestamps:true});

const user = mongoose.model('user',userSchema);
module.exports = user;