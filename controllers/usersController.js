const mongoose = require("mongoose")
const Users=require("../models/users")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");

  let registerUser=async(req,res)=>{
    try{
      // const userData=req.body; 
      const {userName,email,password}=req.body;
      const hashedPassword=await bcrypt.hash(password,10);
      // bcrypt.compare(password,hashedPassword)
      let _user=new Users({userName:userName,email:email,password:hashedPassword});
      const saveResponse=await _user.save();
      if(saveResponse!=null){
        res.status(200).json({statusCode:200,data: saveResponse})
      }
      else
      res.status(500).json({statusCode:500, errorMessage: saveResponse})
  
    }
    catch(error){
      res.status(500).json({sttusCode:500, errorMessage:error.toString()})
    }
  }


  let loginUser=async(req,res)=>{
    try{
      // const userData=req.body; 
      const {email,password}=req.body;
      // Find the user exist or not 
      const user=await Users.findOne({email:email});
      if(!user){
        return res.status(404).json({statusCode:404, errorMessage:"User is not registered against this email"});
      }

      let passwordComparedResponse= await bcrypt.compare(password,user.password);

      let{_id,userName}=user;
     
      if(passwordComparedResponse){

        let jwtOptions ={
          algorithm:'HS256',
          expiresIn:60, 
          issuer:"TestingClient"
        }
        // Now we send JSONWEBTOKEN if our password is correct
        const token=jwt.sign({userId:_id},"mysecretkey",jwtOptions)
        res.status(200).json({statusCode:200,message:"Password Matched",user:{userName,token}})
      }
      else
      res.status(401).json({statusCode:500, errorMessage: "Password Invalid"})
  
    }
    catch(error){
      res.status(500).json({sttusCode:500, errorMessage:error.toString()})
    }
  }

// Todo
//1. Get user from database usign userId
//2. Check current password is valid or not 
//3. Check new password and confirm password are valid or not 
//4. Create encrypted password and update your document/recocrd
//5. Send response that your passowrd is changed

  let changePassword= async(req,res)=>{
    try {

      const token=req.headers.authorization
      console.log(token);
      const decodedToken=jwt.verify(token.replace("Bearer ",""),"mysecretkey")
      const userId=decodedToken.userId
      //Token is valid 
      //Write list of operations
      res.status(200).json({statusCode:200,message:"User id is received"+userId})
    } catch (error) {
      console.log(error.toString())
      res.status(500).json({status:500,error:error.toString()})
    }
  }

module.exports={registerUser,loginUser,changePassword};