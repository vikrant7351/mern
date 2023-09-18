const express = require('express');
const mongoose = require('mongoose');
const connect = require('./model/database');
const user = require('./model/schema');
const referal = require('./model/Referal_schema');
const useraddress = require('./model/Address_schema')
const cors = require('cors');


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





// app.post('/save', async (req, res) => {

//   const { Refcode, userAddress } = req.body;

//   // const newUser = new user(req.body);                  both are same work done
//   const newUser = new user({ Refcode, userAddress });
//   await newUser.save().then(() => {
//     res.status(201).json({ message: 'User created successfully' });

//   },).catch((error) => {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   });


  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: 'Server error' });
  // }

// });



app.post('/api/check-referral', async (req, res) => {
  const { referralCode } = req.body;

  try {
    const referral = await user.findOne({ Refcode: referralCode });

    if (referral) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: 'Invalid referral code' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});



app.post('/api/store-address', async (req, res) => {


  const { referralCode, userAddress } = req.body;

  const userId = generateuserid()
  console.log(userId);
  try {
    const referral = await user.findOne({ Refcode: referralCode });

    if (referral) {
      // res.json({ success: true });

    } else {
      res.json({ success: false, message: 'Invalid referral code' });
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
    return;
  }

  const newuser = new user({ userid: userId, userAddress: userAddress });
  await newuser.save()
  .then(async (result) => {
    console.log('Data saved successfully:', result);

    const newuserRef = new referal({ Refer_by: userId, Refer_to: referralCode });
    await newuserRef.save();
  }).catch((error) => {
      if (error.code === 11000) {
        res.status(400).json({ success: false, message: 'user already singin' });
        return;
      } else {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
        return;
      }
    });
  // res.json({ success: true, message: 'MetaMask address stored successfully' });
});








app.listen(4000, () => {
  console.log('server connect sucessfully')

});
