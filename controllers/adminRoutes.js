const express = require('express');
const router = express.Router();
const courses = require('../model/course');
const become = require('../model/become');
const tutorList = require('../model/hometutorial')
const Subscriber = require('../model/subscribers');

router.get('/courses', (req,res)=>{
    res.render('postCourses', {
        title:''
    })
})

router.get('/', (req,res)=>{
    courses
        .find({})
        .sort({date : -1})
        .exec((err,courses)=>{
            res.render('admincourses', {
                title:'Admin',
                courses:courses
            })
        })
  
})

router.get('/tutorlist', (req,res)=>{
    become
        .find({})
        .sort({_id : -1})
        .exec((err,becomeTutor)=>{
            res.render('tutorlist', {
                title : 'frontline',
                becomeTutor:becomeTutor
            })
        })
})

router.get('/tutorrequest', (req,res)=>{
    tutorList
        .find({})
        .sort({_id : -1})
        .exec((err,tutorRequest)=>{
            res.render('tutorrequest', {
                title : 'frontline',
                tutorRequest:tutorRequest
            })
        })
})
router.get('/subscriberlist', (req,res)=>{
    Subscriber
        .find({})
        .sort({_id:-1})
        .exec((err,subscriber)=>{
            res.render('subscriber', {
                title: 'Subsciber',
                subscriber:subscriber
            })
        })
})


module.exports = router; 