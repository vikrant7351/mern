const mongoose = require("mongoose");
const userSchema= new mongoose.Schema({
    User_id:{
        type:String,
        require:false,
        trim:true
    },
    Name:{
        type:String,
        default:null,
        require:false,
        trim:true
    },
    Mobile:{
        type:Number,
        default:null,
        require:false,
        trim:true
    },
    Email:{
        type:String,
        default:null,
        trim:true,
        require:false

    },
    
    
},{timestamps:true});

const login = mongoose.model('login',userSchema);
module.exports = login;