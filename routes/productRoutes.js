const express=require("express");
const router=express.Router();
const {getProduct,getProducts,sendPromotionEmail}=require("../controllers/productsController");



router.get("/products",getProducts); 
router.get("/products/:id",getProduct);
router.post("/send-email",sendPromotionEmail);
 
module.exports=router;