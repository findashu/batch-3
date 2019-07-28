const express = require('express');

const router = express.Router();

const data = require('../my-data')


router.get('/', function(req,res) {
    res.render('index', {
        title:'My Portfolio',
        hasNavHome : true
    })
});

router.get('/signin' ,(req,res) => {
   
    res.render('signin', {
        layout:'signin-layout',
        title:'SignIn'
    })
})

let users = [
    {name:'ashu',email:'test@test.com', password:'test'},
    {name:'ashu',email:'ashu@ashu.com', password:'ashu'}
]

router.post('/signin',(req,res, next) => {
    let bodyData = req.body;


    let usr = users.filter(e => e.email === bodyData.email)[0];

    console.log(usr)
    if(usr.password === bodyData.password) {
        req.session.user = usr;
        req.session.isLoggedIn = true;
        res.redirect('/admin')
    }else {
        next(new Error('Password is wrong'))
    }
})


router.get('/signout', (req,res) => {
    req.session.isLoggedIn = false;
    req.session.user = {};

    res.redirect('/');
})

module.exports = router;
