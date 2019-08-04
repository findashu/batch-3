const express = require('express');
const router = express.Router();
const UserService = require('../services/userService');



router.get('/', function(req,res) {
    res.render('index', {
        title:'My Portfolio',
        hasNavHome : true
    })
});

router.get('/signup', (req,res) => {
    res.render('signup', {
        title : 'Create a Account',
        layout: 'signin-layout'
    })
})

router.post('/signup', (req,res) => {
    let bodyData = req.body;

    console.log('Signup Data', bodyData);

    UserService.createUser(bodyData).then(d => {
        res.render('signin', {
            layout:'signin-layout',
            title:'SignIn',
            success: 'Successfully Account Created'
        })
    }).catch(err => {
        res.render('signup', {
            title : 'Create a Account',
            layout: 'signin-layout',
            error : err.message
        })
    })
})




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
    

    UserService.login(bodyData.email).then(d => {
        if(d) {
            if(bodyData.password === d.password) {

                req.session.user = d;
                req.session.isLoggedIn = true;
                res.redirect('/admin')
            }else {
                res.render('signin', {
                    layout:'signin-layout',
                    title:'SignIn',
                    error: 'Password is Wrong'
                })
            }
        }else {
            res.render('signin', {
                layout:'signin-layout',
                title:'SignIn',
                error: 'User not found with email'
            }) 
        }
        
    }).catch(err => {
        console.log('Error', err)
        next(new Error('Something went wrong'))
    })

})


router.get('/signout', (req,res) => {
    req.session.isLoggedIn = false;
    req.session.user = {};

    res.redirect('/');
})

module.exports = router;
