const mongoose = require("mongoose");
const userSchema= new mongoose.Schema({
    Refer_by:{
        type:String,
        require:false,
        trim:true
    },
    Refer_to:{
        type:String,
        default:null,
        // require:false,
        trim:true
    },
    
    
},{timestamps:true});

const referal = mongoose.model('referal',userSchema);
module.exports = referal;