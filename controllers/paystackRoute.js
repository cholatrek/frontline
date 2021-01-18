const express = require("express");  
const router = express.Router();
var { v4: uuid } = require("uuid");
const Courses = require('../model/course.js') 
// const paystackKey = process.env.PAYSTACK_KEY
const paystackKey = require('../config/secret')
const axios = require("axios");

const key = paystackKey.publicKey;
router.post("/initialize-transaction/:courseId", async (req, res) => {
  try {
      // the transaction url
      const url = "https://api.paystack.co/transaction/initialize/";
      const courseId = req.params.courseId;
     
      const course = await Courses.findOne({ _id : courseId });
      const courseTitle = course.title;
      // const emailAddress = req.body.email + courseTitle  ;
      const emailAddress = {
        CustomerEmail : req.body.email,
        CourseTitle : course.title
      }
     
      if(course){
        // const sermonAudio = sermon.sermonAudio.split('/').splice(2, sermon.sermonAudio.length - 1).join('/');
        const transactionObject = { 
          reference: uuid(), 
          amount: course.price * 100, 
          email: 'frontlinelearningcentre@gmail.com', 
          title:course.title,
          callback_url: 'http://localhost:4000/confirmation', 
          channels:['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
          metadata: {
            custom_fields: [
               {
                   'display_name': emailAddress 
                   
               }
            ]
         },
        };
        const createdTransaction = await axios({
          method: 'post',
          url,
          data: transactionObject,
          headers: {
            "Authorization": `Bearer ${key}`
          }
        });
        const { authorization_url } = createdTransaction.data.data;
        res.redirect(authorization_url)
      }
      else{
        // what do you want to do here
        res.json({ error: "" })
      }
  } catch (error) {
    // what do you want to do here
    console.log(error)
    res.json({ error })
  }
}); 

module.exports = router;
