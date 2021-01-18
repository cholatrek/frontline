const express =  require('express');
const router = express.Router();
const Course = require('../model/course');


router.get('/', (req,res)=>{
    res.render('index', {
        title:'Homepage'
    });
    
})


router.get('/about', (req,res)=>{
    res.render('about', {
        title:'Frontline|About',
        message:req.flash('message')
    });
    
})
 
router.get('/hometutorial', (req,res)=>{
    res.render('hometutorial', {
        title:'Frontline|hometutoring'
    });
    
})
 
router.get('/services', (req,res)=>{
    res.render('services', {
        title:'Frontline|Services'
    });
    
})


router.get('/courses', (req,res)=>{
    Course
        .find()
        .sort({_id:-1})
        .exec((err,courses)=>{
            res.render('courses', {
                title: 'Frontline|courses',
                courses:courses
            })
        })
   
})

router.get('/faq', (req,res)=>{
    res.render('faq', {
        title:'Frontline|FAQ'
    });
    
})


router.get('/confirmation', (req,res)=>{
    res.render('confirmDetails', {
        title:'Frontline|Confirm Details'
    });
    
})

router.get('/becometutor', (req,res)=>{
    res.render('becomeatutor', {
        title : 'Become a tutor',
        message : req.flash('message')
    })
})

router.get('/home', (req,res)=>{
    Course
        .find({})
        .sort({_id : -1})
        .exec((err,courses)=>{
            res.render('home', {
                title : 'Home page',
                courses:courses,
                message:req.flash('message')
            })
        })
 
}) 



module.exports = router;