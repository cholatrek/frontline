const express = require('express');
const app =  express();
const secret = require('./config/secret.js');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const ejs = require('ejs')
const bodyParser = require('body-parser')

mongoose.connect( secret.db, {
    
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

app.use(bodyParser.urlencoded())
mongoose.connection.on('open', ()=>{
    console.log('we are already here ')
});
app.set('view engine', 'ejs');

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
  }));


app.use(flash()); 


app.use(express.static('public'))




const pageRoutes = require('./controllers/pageRoutes');
app.use('/', pageRoutes);

const courseRoutes = require('./controllers/courseRoutes');
app.use('/', courseRoutes);

const adminRoutes = require('./controllers/adminRoutes');
app.use('/admin', adminRoutes);

const postRoutes = require('./controllers/postRoutes');
app.use('/', postRoutes);

const paystackRoute = require('./controllers/paystackRoute');
app.use('/', paystackRoute)


app.listen(secret.port, ()=>{ 
    console.log('we are already connected to the server on port ' + secret.port  )
})