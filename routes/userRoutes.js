const express=require("express");
const router=express.Router();
const {registerUser,loginUser, changePassword}=require("../controllers/usersController")


router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/change-password", changePassword);


module.exports=router;