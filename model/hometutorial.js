const express = require('express');
const mongoose = require('mongoose');
const Schema= mongoose.Schema 

const homeTutorialSchema = new Schema({
    
    name : String,
    email:String,
    phone:String,
    prefer:String,
    message:String,
    date:Date

    
})
module.exports = mongoose.model('hometutorial', homeTutorialSchema)