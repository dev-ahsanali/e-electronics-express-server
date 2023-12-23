const mongoose = require("mongoose");
const Categories=require("../models/categories") 






const getCategories=async(req,res)=>{

    try{
      const categories=await Categories.find({});
      res.status(200).json({statusCode:200, data:categories}) ;
  
    }
    catch(error){
      res.status(500).json({sttusCode:500, errorMassage:error.message})
    }
  }
  
const getCategory=async (req,res)=>{
    try{
   
      const id=req.params.id;
      console.log("id:"+ id );
      // Check if id is valid or not
       const ObjectId=require("mongodb").ObjectId
       if(!ObjectId.isValid(id)){
         return res.status(500).json({statusCode:500,errorMassage:"Invalid id"})
       }
    const categories=await Categories.find({_id:new mongoose.Types.ObjectId(id)});
    res.status(200).json({statusCode:200,data:categories});
   
    }catch(error){ 
      res.status(500).json({sttusCode:500, errorMassage:error.toString()})
    }
  
  }

  const createCategory=async(req,res)=>{
    try{

      //custom validation
    // const {username,name,address}=req.body
    // if (!username){
    // return res.status(400).json({message: Name field is required})
    // } 

      // Data get through Body
      const categoryData=req.body; 
      // create object of data model
      let _category=new Categories(categoryData);
  
      const saveResponse=await _category.save();
      if(saveResponse!=null){
        res.status(200).json({statusCode:200,data: saveResponse})
      }
      else
      res.status(500).json({statusCode:500, errorMessage: saveResponse} )
  
    }
    catch(error){
      res.status(500).json({sttusCode:500, errorMessage:error.toString()})
    }
  }

  const deleteCategory=async(req,res)=>{
    try{
        const id=req.params.id;
        console.log(id);
        const ObjectId=require("mongodb").ObjectId;
        if(!ObjectId.isValid(id)){
          return res.status(400).json({statusCode:400, errorMessage:"Invalide ID"})
        }
        
  
        const categories=await Categories.deleteOne({_id:new mongoose.Types.ObjectId(id)});
        res.status(200).json({statusCode:200,data:categories});
       
        }catch(error){ 
          res.status(500).json({sttusCode:500, errorMassage:error.toString()})
        } 
  
      }


module.exports={getCategories,getCategory,createCategory,deleteCategory};