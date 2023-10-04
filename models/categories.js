const mongoose = require("mongoose");

// Categories Schema 
const categoriesSchema=new mongoose.Schema({
    username:String,
    name:String,
    address:String
  });
  const Categories=mongoose.model("categories",categoriesSchema);
  
  module.exports=Categories