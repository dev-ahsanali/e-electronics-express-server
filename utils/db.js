const mongoose = require("mongoose"); 
require("dotenv").config();

// here connect: is the name of function 
// function assigned to connect attribute in in object
 

module.exports = {
  connect:function () {
    mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => {
        console.log("Connection Established");
      })
      .catch((err) => {
        console.log("Connection Error", err);
      });
  },
};
