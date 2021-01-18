const express = require('express');
const router = express.Router();
const Course = require('../model/course');
const multer = require('multer')
const path = require('path');

router.get('/coursedetails/:id',(req,res)=>{
    Course
    .findOne({ _id : req.params.id})
    .exec((err,course)=>{
        Course
            .find({})
            .sort({_id:-1})
            .exec((err,relatedCourses)=>{
                console.log(course)
                res.render('coursedetails', {
                    title:'Course Detail',
                    course:course,
                    related:relatedCourses
                })
            })
           
        })
 
})



const storage = multer.diskStorage({
    destination: './public/uploads/course',
    filename:function(req,file, cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname)  );
    }
});

const upload = multer({
    storage : storage
}).fields([

    { name: 'courseImage' }
    

]
    
)


router.post('/postCourse', (req,res)=>{
    upload(req,res,(err)=>{
       
            if(err){
                res.send(err);
            }else{
        

        console.log(req.files)
        const course = new Course({
            title:req.body.title,
            description:req.body.description,
            introductoryVideo:req.body.introductoryVideo,
            price:req.body.price,
            instructor:req.body.instructor,
            lectureNo:req.body.lectureNo,
            enrolled:req.body.enrolled,
            language:req.body.language,
            date:req.body.date,
            courseImage:req.files.courseImage[0].destination + '/' +  req.files.courseImage[0].filename
        }).save((err,course)=>{
            res.redirect('/courses')
            
        })
    }
  
} )
 
})
// upload(req,res,(err)=>{
       
//     if(err){
//         res.send(err);
//     }else{

// edit  a post router

//edit a blog post
router.post('/courseEdit/:id', (req,res)=>{

    // console.log(req.params.id)
    let items = {}

                items.title =  req.body.title
                items.description = req.body.description
                items.introductoryVideo = req.body.introductoryVideo
                items.price = req.body.price
                items.instructor = req.body.instructor
                items.enrolled = req.body.enrolled
                items.lectureNo = req.body.lectureNo
                items.language = req.body.language
                items.date = req.body.date
                   
    console.log(items.title)
    let query  = { _id : req.params.id};
    
    Course
        .update(query, items, function(err){

            if(err){

                console.log(err)

            }else{

                res.redirect('/admin/coursedetails')
            }
        });

})

//delete a blog post
router.post('/courseDelete/:id', (req,res)=>{

Course.findByIdAndRemove({ _id : req.params.id }).then((Course)=>{
    res.redirect('/admin/coursedetails')
});

});  



module.exports = router