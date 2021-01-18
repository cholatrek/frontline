const express = require('express');
const mongoose = require('mongoose');
const Schema= mongoose.Schema 

const confirmedSchema = new Schema({
    
  
    email:String,
    
    
})
module.exports = mongoose.model('confirmed', confirmedSchema)