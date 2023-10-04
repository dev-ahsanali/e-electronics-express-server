const express=require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const categoriesRoutes=require("./routes/categoryRoutes");
const prdouctRoutes=require("./routes/productRoutes");

const db=require("./utils/db");
db.connect();


const port=process.env.PORT;
const host=process.env.HTTP_HOST || 'localhost';
//created object to run server
const app=express();

// Body Parser
// Middleware
app.use(express.json())

app.use("/",categoriesRoutes);
app.use("/",prdouctRoutes);

// Manage two different versions
// app.use("/v1",prdouctsRoutes);
// app.use("/v2",categoriesRoutes);


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
    res.send(`Express server is running on ${port}`)
})  


//listen is function of express
app.listen(port,host,()=>{
    console.log("Listening on port"+ port );
})

