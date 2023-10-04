const express=require("express");
const router=express.Router();
const {getProduct,getProducts}=require("../controllers/productsController");
  
router.get("/products",getProducts); 
router.get("/products/:id",getProduct);


module.exports=router;