const mongoose = require("mongoose");

//Products  Schema
const productsSchema=new mongoose.Schema({
    title:String,
    description:String,
    category:String,
    quantity:Number,
    isAvailable:Boolean
  })
  
  // Model
  // Model is created from schema
  const Products=mongoose.model("products",productsSchema);


  module.exports=Products