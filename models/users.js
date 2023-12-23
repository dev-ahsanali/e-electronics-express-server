const mongoose = require("mongoose");

// Users Schema 
const usersSchema=new mongoose.Schema({ 
  userName:String,
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  }
  });

  const Users=mongoose.model("users",usersSchema); 
  
  module.exports=Users;