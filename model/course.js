const express = require('express');
const mongoose = require('mongoose');
const Schema= mongoose.Schema 

const courseSchema = new Schema({
    
    title : String,
    description:String,
    introductoryVideo:String,
    price:String,
    instructor:String,
    lectureNo:String,
    enrolled:String,
    language:String,
    date:Date ,
    courseImage:String
 
    
})
module.exports = mongoose.model('course', courseSchema)