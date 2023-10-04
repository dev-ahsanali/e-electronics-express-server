const express=require("express");
const router=express.Router();
const {getCategories,getCategory,createCategory,deleteCategory}=require("../controllers/categoriesController")
  
  router.get("/categories",getCategories);
  
  router.get("/categories/:id",getCategory)

  router.post("/categories",createCategory)
  
  router.delete("/categories/:id",deleteCategory)

    module.exports=router;