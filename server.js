const express = require("express");
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

let app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next )=>{
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;

    fs.appendFile("server.log", log + '\n', (err)=>{
        if(err){
            console.log('Unable to append to server.log');
        }
    });
    console.log(log);
    next();
})

app.use((req, res, next)=>{
    res.render('maintence.hbs')
})

app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrent', () =>{
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
})

app.get('/',(req, res)=>{
    //res.send('</h1>Hello Express</h1>');
    res.send({
        name: 'Byron',
        likes: [
            'Comics',
            'Coding'
        ]
    })
})

app.get('/about', (req, res)=>{
    res.render('about.hbs',{
        pageTitle: 'About Page',
    })
});

app.get('/home', (req,res)=>{
    res.render('home.hbs',{
        pageTitle: 'Home page',
        message: 'Welcome to my home page'
    })
})

// /bad -send back json with error message

app.get('/back', (req,res)=>{
    res.send({
        error: 'Unable to load page'
    })
})

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
});