// const path = require('path');
const express = require('express');
require("dotenv").config();
const nodemailer = require('nodemailer');
// const router = express.Router();
// const app = express();

// const express = require("express");              ex
// const router=express.Router();       ex
// const cors = require('cors')
// app.use(cors())
// const buildPath = path.join(__dirname, '..', 'build');
// app.use(express.json());
// app.use(express.static(buildPath)); 
 
exports.emailport=(req,res)=>{
 
    var transporter = nodemailer.createTransport({
        host:'mail.google.com',
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASSCODE
        }
    });
 
    var mailOptions = {
        from: "testingtheera@gmail.com",// sender address
        to: req.body.to, // list of receivers
        subject: req.body.subject, // Subject line
        text:req.body.description,
        name:req.body.name,
        amounti:req.body.amounti,
        html: `
        <div style="padding:10px;border-style: ridge">
        <h1>SabeKuch</h1>
        <h2>Thanks for chosing us</h2>
        <p>Dear ${req.body.name}</p>
        <h3>Your order is successfully placed <br> your order ID is: ${req.body.description}</h3>
        <ul>
            THANKS for believing in us. We hope for your best wishes.
            TEAM SabeKuch
        </ul>
        `
    };
    // console.log(mailOptions);
     
    transporter.sendMail(mailOptions, function(error, info){
        if (error)
        {
          res.json({status: false, respMesg: 'Email ERROR'})
          console.log(error);
        } 
        else
        {
          res.json({status: true, respMesg: 'Check Spam if you did not recieve your email'})
        }
     
      });
};
 
// listen to the port
// app.listen(5000, () => {
//     console.log('server start on port 3030');
//   });