const express = require('express');
const mongoose = require('mongoose');
const Schema= mongoose.Schema 

const becomeSchema = new Schema({
    
    name : String,
    email:String,
    age:Number,
    gender:String,
    phone:String,
    years:String,
    teaching:String,
    location:String,
    cvLink:String

    
})
module.exports = mongoose.model('become', becomeSchema)