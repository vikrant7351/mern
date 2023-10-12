const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const connect = require('./model/database');
const { User,Userregister,ContractAddress,SupportTicket,BankDetails,Transaction} = require('./model/ops');
const jwt = require('jsonwebtoken');

const cors = require('cors');
const userSchema = new User();
const referralSchema = new Userregister();
const contractAddressSchema = new ContractAddress();
const supportTicketSchema = new SupportTicket();
const bankDetailsSchema = new BankDetails();
const transactionSchema = new Transaction();
const {checkToken, ApiAutheticateToken} = require('./auth');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


function generateuserid(length = 10) {
  const characterSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characterSet.length);
    randomString += characterSet.charAt(randomIndex);
  }

  return randomString;
}

app.post('/api/check-referral',ApiAutheticateToken, async (req, res) => {
  const { referralCode } = req.body;
  
  try {
    const referral = await referralSchema.verifyReferal({referralCode:referralCode});
    if (referral) {
      res.json({ success: true, message: 'valid referalcode' });
    } else {
      res.json({ success: false, message: 'invalid! referalcode' })
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server erro!!r' });
  }
});



app.post('/api/store-address', async (req, res) => {
  const { referralCode, userAddress } = req.body;
  const userId = generateuserid();
  try {
    const referral = await contractAddressSchema.useradd({ userId: userId, contractAddress: userAddress });
    if(referral){
      res.json({ success: true , message :'wallet connect' });
    }else{
      res.json({success:false , message:'occured some error'});
    }
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ success: false, message: 'User already signed up' });
    } else {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
});


app.post('/api/verify-address',async(req, res) => {
const { userAddress } = req.body;
try{
const existinguser = await contractAddressSchema.verifyadd({contractAddress:userAddress})
if(existinguser){

  const secretKey = process.env.JWT_KEY; // Replace with your secret key
  const token = jwt.sign({ user: existinguser }, secretKey, { expiresIn: '1h' });

  res.json({success:true,message:'user exist',token});
  return ;
}else{
  res.json({success:false,message:'user not found'});
  return;
}
}catch(error){
  console.error(error);
  res.status(500).json({ success: false, message: 'Server error' });
}
});


app.get('/api/userdata',checkToken,async(req,res)=>{
try{
  const existinguser = await contractAddressSchema.usershow ({contractAddress:"0xdc1e75b7b0a6d943ac527922035296596c85e466"});
  if(existinguser){
    res.json({userId:existinguser.userId,contractAddress:existinguser.contractAddress})
  }else{
    res.json({message:'user not found'});
  }
}catch (error){
  console.error(error);
  res.status(500).json({ success: false, message: 'Server error' });
}
});



app.post('/api/supporttic',checkToken, async (req, res) => {

  const Ticketid = generateuserid();
  const {userId, subject , description , status} = req.body;
 
  try {
    const referral = await supportTicketSchema.support({ userId:userId , TicketId:Ticketid,subject:subject ,description:description,status:status});
    // console.log(referral);
    if(referral){
      res.json({ success: true, message: 'Ticket created successfully!' });
    } else {
      res.json({ success: false, message: 'Failed to create ticket.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


app.post('/api/addBanks',checkToken, async (req, res) => {
 
  const { userId,accountHolderName, accountNumber,bankName, IfscCode,TransectionType} = req.body;
 
  try {

    const referral = await bankDetailsSchema.addbank({ userId:userId ,accountHolderName: accountHolderName ,accountNumber:accountNumber,bankName:bankName,IFSCcode:IfscCode,Banktype:TransectionType});
    // console.log(referral);

    if(referral){
      res.json({ success: true, message: 'create account sucessfully' });
    } else {
      res.json({ success: false, message: 'Failed to create account.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});



app.post('/api/addMoney',checkToken, async (req, res) => {

  const {userId,amount ,TransectionType} = req.body;

  try {
    
    const referral = await  transactionSchema.addmoney({ userId:userId,amount:amount,transactionType:TransectionType});

    if(referral){
      res.json({ success: true, message: 'money add sucessfully' });
    } else {
      res.json({ success: false, message: 'Failed to money in  account.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


app.post('/api/userRegister',checkToken, async (req, res) => {

  const { userId,username,  email, mobile_no, password, referralCode} = req.body;
 
  try {
    const referral = await  userSchema.userRegister({username:username,email:email,mobile_no:mobile_no,password:password,referralCode:referralCode,referredBy:userId});
    // console.log(referral);

    if(referral){
      res.json({ success: true, message: 'user register sucessfully' });
    } else {
      res.json({ success: false, message: 'user register falied' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`server runing on ${port}`);

});
