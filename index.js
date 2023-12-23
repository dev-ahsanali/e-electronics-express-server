const express=require("express");
const mongoose = require("mongoose");
const cors=require("cors");
require("dotenv").config();
const categoriesRoutes=require("./routes/categoryRoutes");
const prdouctRoutes=require("./routes/productRoutes");
const userRoutes=require("./routes/userRoutes");
const cloudinary=require("cloudinary").v2;

const multer=require("multer");
const fs=require('fs');
const path=require('path');




const db=require("./utils/db");
db.connect();


const port=process.env.PORT;  
const host=process.env.HTTP_HOST || 'localhost';
//created object to run server
const app=express();
app.use(cors());
 
// Body Parser
// Middleware
app.use(express.json())

app.use("/",categoriesRoutes);
app.use("/",prdouctRoutes);
app.use("/user",userRoutes);

// Manage two different versions
// app.use("/v1",prdouctsRoutes);
// app.use("/v2",categoriesRoutes);

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET,
  });

//Config multer for file uploads
const storage=multer.memoryStorage();
const upload=multer({storage});

//Define a schema for storing file references in MongoDB
const fileSchema=new mongoose.Schema({
    filename:String,
    url:String
})
const File=mongoose.model('File',fileSchema);


//Handle File Upload
// the upload between path and async is middleware
//Middle ware executed first before async 
app.post('/upload',upload.single('file'), async(req,res)=>{
    try{
        if(!req.file){
            return res.status(400).json({message:"No file to upload"})
        }

           //Write the buffer to temporary file 
            const tempFilePath=path.join(__dirname,'uploads', req.file.originalname);
            fs.writeFileSync(tempFilePath, req.file.buffer);

            //Upload the temporary file to Cloundinary
            const result=await cloudinary.uploader.upload(tempFilePath, {resource_type: 'auto' })

            //Save file reference in MongoDB
            const newFile =new File({ 
                filename:req.file.originalname,
                url:result.secure_url,
            });
            newFile.save();

            //Remove the temporary file
            // fs.unlinkSync(tempFilePath);

            res.json({url:result.secure_url});

    }
    catch(error){
        console.error('Error:', error);
        res.status(500).json({error: 'Server Error'});

    }

}
)

// for local db
//mongodb://localhost:27017/my-crud-app-local-db

// mongoose.connect("mongodb+srv://ahsan:ahsanali79@my-data-cluster.3roupcs.mongodb.net/?retryWrites=true&w=majority").
// then( ()=>{
//         console.log("Connection Established");
//  }).catch((err)=>{n
//     console.log("Connection Error");
//  })
 





// Router for single product
// Get data through URL




//get give request type  
// in / we give route
// In request we get data when we consume API // Data from outside 
// In response response we send data from here  (We send data or Show data at client Side)

//Creating routes
app.get('/', async(req,res)=>{
    res.send(`Express server is running on the ${port}`)
})  


//listen is function of express
app.listen(port,host,()=>{
    console.log("Listening on port"+ port );
})

