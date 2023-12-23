const mongoose = require("mongoose");

// Categories Schema 
const categoriesSchema=new mongoose.Schema({ 
  title:{
      type:String,
      // unique:true,
      required:[true, "Must enter title"]
   
    },
  });

  const Categories=mongoose.model("categories",categoriesSchema); 
  
  module.exports=Categories