const mongoose=require("mongoose");
const Products=require("../models/products");
const{sendEmail}=require("../utils/emailUtils") 


const getProducts=async (req,res)=>{

    try{
      // To find single objectID
      // const ObjectId=new mongoose.Types.ObjectId;
      // const products=await Products.find({_id: new mongoose.Types.ObjectId('64f846abc192b7f5d7d41955')});
  
      // Find/Fetch data from the Model
    const products=await Products.find({}).populate('categories').exec();
    res.status(200).json({statusCode:200,data:products});
  
    }catch(error){ 
      res.status(500).json({sttusCode:500, errorMassage:error.toString()})
    }
  
  }

const getProduct=async (req,res)=>{
    try{
      // API end get parameter in url 
      // and show that data in parameters 
      const id=req.params.id;
      console.log("id:"+ id );
      // Check if id is valid or not
       const ObjectId=require("mongodb").ObjectId
       if(!ObjectId.isValid(id)){
         return res.status(500).json({statusCode:500,errorMassage:"Invalid id"})
       }
  
    const products=await Products.find({_id:new mongoose.Types.ObjectId(id)});
    res.status(200).json({statusCode:200,data:products});
   
    }catch(error){ 
      res.status(500).json({sttusCode:500, errorMassage:error.toString()})
    }
  
  }

   
  let sendPromotionEmail=async (req,res)=>{
    try{
      const {to,subject,message}=req.body;
      const respone= await sendEmail(to,subject,message);
      res.status(200).json({response: respone});
    }catch(error){ 
      console.log(error);
    }
  }




  module.exports={getProduct,getProducts,sendPromotionEmail};