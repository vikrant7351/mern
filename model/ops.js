const mongoose = require('mongoose');
const userSchema = require('./User_schema');
const contractAddressSchema = require('./Address_schema');
const transactionSchema = require('./Transaction_schema');
const bankDetailsSchema = require('./Bank_schema');
const supportTicketSchema = require('./Tsupport_schema');
const referralSchema = require('./referal');




class BaseModel {
  constructor(model) {
    this.model = model;
  }
  async create(data) {
    try {
      const instance = new this.model(data);
      await instance.validate(); // Validate data before saving
      await instance.save();
      return instance;
    } catch (error) {
      return error;
      // throw error;
    }
  }

  async getById(id) {
    try {
      const instance = await this.model.findById(id);
      if (!instance) {
        throw new Error(`Instance not found with id ${id}`);
      }
      return instance;
    } catch (error) {
      return error;
      // throw error;
    }
  }

  async getone(id) {
    try {
      // console.log(id)
      const instance = await this.model.findOne(id);
      if (!instance) {
        return false;
      }
      return instance;
    } catch (error) {
      return error;

    }
  }

  async updateById(id, data) {
    try {
      const instance = await this.model.findByIdAndUpdate(id, data, { new: true });
      if (!instance) {
        return false;
        // throw new Error(`Instance not found with id ${id}`);
      }
      return instance;
    } catch (error) {
      return error;
      // throw error;
    }
  }
  async deleteById(id) {
    try {
      const instance = await this.model.findByIdAndDelete(id);
      if (!instance) {
        throw new Error(`Instance not found with id ${id}`);
      }
    } catch (error) {
      return error;
    }
  }
}

class Userregister extends BaseModel {
  constructor() {
    super(mongoose.model('userregister',referralSchema));
  }
  async verifyReferal(referralCode) {
    try {
      const referral = await this.getone(referralCode);
      return referral;
    } catch (error) {
      console.error(error);
    }
  }
}



// Define User class
class User extends BaseModel {
  constructor() {
    super(mongoose.model('User',userSchema));
  }

  async userRegister(data){
    try{
    const referral = await this.create(data);
    return referral;
    }catch(error){
      console.error(error);
    }
  }
}

// Define ContractAddress class
class ContractAddress extends BaseModel {
  constructor() {
    super(mongoose.model('ContractAddress', contractAddressSchema));
  }
  async useradd(data) {
    try {
      const referral = await this.create(data);
      return referral;
    } catch (error) {
      console.error(error);
      return false;
    }
  }


  async verifyadd (userAddress){
    try{
    const referral = await this.getone(userAddress)
    return referral;

  }catch(error){
    console.error(error);
    return false;
  }
}
async usershow (userId){

  try{
  const referral = await this.getone(userId)
  return referral;

}catch(error){
  console.error(error);
  return false;
}
}
}

// Define BankDetails class
class BankDetails extends BaseModel {
  constructor() {
    super(mongoose.model('BankDetails', bankDetailsSchema));
  }

 async addbank (data) {
  try {
    const referral = await this.create(data);
    return referral;
  } catch (error) {
    console.error(error);
    return false;
  }
}
}


// Define Transaction class
class Transaction extends BaseModel {
  constructor() {
    super(mongoose.model('Transaction', transactionSchema));
  }
  async addmoney(data){
    try{ 
      const referral = await this.create(data);
      return referral
    }catch(error){
      console.error(error);
        return false;
    }
  }
}

// Define SupportTicket class
class SupportTicket extends BaseModel {
  constructor() {
    super(mongoose.model('SupportTicket', supportTicketSchema));
  }

    async support (data) {
      try {
        const referral = await this.create(data);
        return referral;
      } catch (error) {
        console.error(error);
        return false;
      }
    }
  }




module.exports = { User,Userregister,ContractAddress , SupportTicket ,BankDetails,Transaction };
