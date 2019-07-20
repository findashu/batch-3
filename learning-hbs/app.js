const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();


// setting up view engine
app.set('views', __dirname+'/views');
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname+'/views/partials');


app.use(express.static(__dirname+'/static'));

function logger(req,res,next) {
    console.log(req.method, req.url);
    next();
}

app.use(logger)



// routes
app.get('/', function(req,res) { 
    res.render('index', {
        title:'My Home Page',
        name:'Ashutosh Mishra',
        whtDng: '<p>Learning HBS</p>',
        description: {
            fullName:"Ashutosh Mishra",
            gender:'Male',
            age:26
        },
        hobbies: ['Football', "Music", "Reading"],
        married : true,
        headerHome : true
    })
});

function aboutMiddleware(req,res,next) {
    if(req.query.name == 'ashu') {
        next()
    }else {
        res.send('You are unauthenticated')
    }
}


app.get('/about', aboutMiddleware,  function(req,res, next) {
    
    
    
    res.render('about', {
        title:req.query.name || ''
    })
});



app.get('/test-err', function(req,res, next) {
    fs.readFile(__dirname+'/heo.txt','utf-8', function(err, data) {
        if(err) {
            next(err)
        }else {
            console.log(data)
            res.json({data});
        }
    })
})




app.use(function(req,res,next) {
    res.status(404).render('404', {
        title:'Page not Found'
    })
})

app.use(function(err,req,res,next) {
    console.log(err);
    res.status(500).send('Something went wrong')
})

// starting server
app.listen(3040, () => console.log('Server started on port 3040'))

