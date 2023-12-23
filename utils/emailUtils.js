const nodemailer=require("nodemailer")
// kfje teta vfhx qctx

const transporter=nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user:"prince.ahsanali.79@gmail.com",
        pass:"kfje teta vfhx qctx"
    }

})

const sendEmail= async (to,subject,message)=>{
    const mailOptions={
        from:"prince.ahsanali.79@gmail.com",
        to:to,
        subject:subject,
        html:message
    }
    try{
        const response= await transporter.sendEmail(mailOptions)
        console.log(response);
      }
      catch{
      
      }
}


module.exports={sendEmail}