const express = require('express');
const nodemailer = require("nodemailer");
const router = express.Router();
const Quotation = require('../model/hometutorial');
const Becomeatutor = require('../model/become');
const Subscriber = require('../model/subscribers');  
const Confirmed = require('../model/confirmed');  
const multer = require('multer')
const path = require('path');

const storage = multer.diskStorage({
    destination: './public/uploads/cv',
    filename:function(req,file, cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname)  );
    }
});

const upload = multer({
    storage : storage
}).fields([

    { name: 'cvFile' }
    

]
    
)





router.post('/becomeatutor', (req,res)=>{

    upload(req,res,(err)=>{
       
        if(err){
            res.send(err);
        }else{
    
    
    console.log(req.files)
    const becomeatutor = new Becomeatutor({
        name:req.body.name,
        email:req.body.email,
        age:req.body.age,
        gender:req.body.gender,
        phone:req.body.phone,
        years:req.body.years,
        teaching:req.body.teaching,
        location:req.body.location,
        cvLink:req.files.cvFile[0].destination + '/' +  req.files.cvFile[0].filename
    }).save((err,becomeatutor)=>{
        
        
    })
    }
    
    } )




    const output = `
    <p>  Hello Frontline, you have a new home tutor request, Kindly reach out to them  </p>
    <p>Log on to https://frontlinelc.com/admin/tutorlist</p>
    
   

`;

let transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'info@cholatrek.org', // generated ethereal user
      pass: 'Kollybright150@' // generated ethereal password
    },

    tls:{
        rejectUnauthorized:false
    }
  });

  // send mail with defined transport object
  let infos =({
       
    from: '"Frontline Learning Center 👻" <info@cholatrek.org>', // sender address
    to: "frontlinelearningcentre@gmail.com, support@frontlinelc.com,  info@cholatrek.org, cholatrek@gmail.com", // list of receivers
    subject: "NEW TUTOR'S DETAIL COLLECTED ✔", // Subject line
    text: "Hello world?", // plain text body
    html: output // html body 
  });


  transporter.sendMail(infos, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    console.log("Message sent: %s", info.messageId);
   
});


req.flash('message', 'Your details have been submitted successfully ')
        res.redirect('/becometutor')



  
} );



// coupled alingside nodemailer
router.post('/hometutorial', (req,res)=>{

    const output = `
    <p>  Hello Frontline, you have a new home tutor request, Kindly reach out to them, below is their details  </p>
    <h3>The table below shows the contact details</h3>
    
    <table border ="1" cell-padding="2" >
        <tr>
            <td>Name:<td>
            <td>${ req.body.name}<td>
        </tr>
        <tr>
            <td>Email:<td>
            <td>${ req.body.email}<td>
        </tr>
        <tr>
            <td>Phone:<td>
            <td>${ req.body.phone}<td>
        </tr>
        <tr>
            <td>Prefer:<td>
            <td>${ req.body.prefer}<td>
    </tr>
    <tr>
            <td>Message:<td>
            <td>${ req.body.message}<td>
    </tr>
       
    </table>

`;

let transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'info@cholatrek.org', // generated ethereal user
      pass: 'Kollybright150@' // generated ethereal password
    },

    tls:{
        rejectUnauthorized:false
    }
  });

  // send mail with defined transport object
  let infos =({
       
    from: '"Frontline Learning Center 👻" <info@cholatrek.org>', // sender address
    to: "frontlinelearningcentre@gmail.com, support@frontlinelc.com,  info@cholatrek.org, cholatrek@gmail.com", // list of receivers
    subject: "NEW HOME TUTORIAL REQUEST ✔", // Subject line
    text: "Hello world?", // plain text body
    html: output // html body 
  });


  transporter.sendMail(infos, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    console.log("Message sent: %s", info.messageId);
   
});




    const quotation =  new Quotation({
        name : req.body.name,
        phone:req.body.phone,
        email : req.body.email,
        prefer : req.body.prefer,
        message : req.body.message
    }).save((err,hometutorial)=>{
        if(err){
            console.log(err)
        }else{
            // req.flash('message', 'Your request was submitted, we will get in touch with you! ')
            res.redirect('/hometutorial')
        }
    })
} );






// coupled alingside nodemailer
router.post('/subscribe', (req,res)=>{

    const output = `
    <p>  Hello Frontline, you have a new Suubscriber, Kindly reach out to them, below is their details  </p>
    <h3>The table below shows the contact details</h3>
    
    <table border ="1" cell-padding="2" >
      
        <tr>
            <td>Email:<td>
            <td>${ req.body.email}<td>
        </tr>
   
    </table>

`;

let transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'info@cholatrek.org', // generated ethereal user
      pass: 'Kollybright150@' // generated ethereal password
    },

    tls:{
        rejectUnauthorized:false
    }
  });

  // send mail with defined transport object
  let infos =({
       
    from: '"Frontline Learning Center 👻" <info@cholatrek.org>', // sender address
    to: "frontlinelearningcentre@gmail.com,  info@cholatrek.org, cholatrek@gmail.com", // list of receivers
    subject: "NEW SUBSCRIBER REGISTERED ✔", // Subject line
    text: "Hello world?", // plain text body
    html: output // html body 
  });


  transporter.sendMail(infos, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    console.log("Message sent: %s", info.messageId);
   
});




    const subscriber =  new Subscriber({
      
        email : req.body.email,
       
    }).save((err,hometutorial)=>{
        if(err){
            console.log(err)
        }else{

            req.flash('message', "Thank you for subscribing to our newsletter, you'd receive updates from us about our courses and upldates on our social media pages");
            res.redirect(req.get('referer'))
        }
    })
} );



router.post('/confirmDetials', (req,res)=>{

    const output = `
    <p>  Hello Frontline, someone just paid for a course, please give access to the person </p>
    <h3>The table below shows the contact details</h3>
    
    <table border ="1" cell-padding="2" >
      
        <tr>
            <td>Email:<td>
            <td>${ req.body.email}<td>
        </tr>
   
    </table>

`;

let transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'info@cholatrek.org', // generated ethereal user
      pass: 'Kollybright150@' // generated ethereal password
    },

    tls:{
        rejectUnauthorized:false
    }
  });

  // send mail with defined transport object
  let infos =({
       
    from: '"Frontline Learning Center 👻" <info@cholatrek.org>', // sender address
    to: "skolly150@gmail.com frontlinelearningcentre@gmail.com  info@cholatrek.org cholatrek@gmail.com", // list of receivers
    subject: "NEW COURSE PURCHASE ✔", // Subject line
    text: "Hello world?", // plain text body
    html: output // html body 
  });


  transporter.sendMail(infos, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    console.log("Message sent: %s", info.messageId);
   
});




    const confirmed =  new Confirmed({
      
        email : req.body.email,
       
    }).save((err,confirmed)=>{
        if(err){
            console.log(err)
        }else{

            req.flash('message', "Course Registration successful! we would send a confirmation email to you soon");
            res.redirect(req.get('referer'))
        }
    })
} );



module.exports = router;