const mongoose = require("mongoose");

//Products  Schema
const productsSchema=new mongoose.Schema({
    title:String,
    description:String,
    quantity:Number,
    isAvailable:Boolean,
    ratings:Object,
    reviews:Array,
    category:{ 
      type:mongoose.Schema .Types.ObjectId,
      ref:'categories' 
    }
  })
  
  // Model
  // Model is created from schema
  const Products=mongoose.model("products",productsSchema);


  module.exports=Products