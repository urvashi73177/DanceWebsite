

const express = require("express");
const path = require("path")
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 8081;


// define mongoose
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
  });
const contact = mongoose.model('contact', contactSchema);
  

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
// app.use(express.urlencoded())
app.use(express.urlencoded({ extended: true }))
// app.use(express.static('public'));

// app.use('/images', express.static(__dirname + '/Images'));


// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views'))

// ENDPOINTS
app.get('/', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    // const con = "This is the best content on the internet so far so use it wisely"
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    // const con = "This is the best content on the internet so far so use it wisely"
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to database")

    }).catch(()=>{
       res.status(400).send("Item is not send to the database") 
    })

    // res.status(200).render('contact.pug');
});

// About us endpoint

app.get('/about', (req, res)=>{
    // const con = "This is the best content on the internet so far so use it wisely"
    const params = {}
    res.status(200).render('about.pug', params);
})


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});