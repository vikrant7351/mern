const mongoose = require("mongoose");
const userSchema= new mongoose.Schema({

    User_id:{
        type:String,
        require:false,
        default:null,
        trim:true
    },
    useraddress:{
        type:String,
        default:null,
        trim:true

    }
    
    
},{timestamps:true});

const useraddress = mongoose.model('useraddress',userSchema);
module.exports = useraddress;