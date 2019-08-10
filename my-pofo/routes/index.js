const express = require('express');
const router = express.Router();
const UserService = require('../services/userService');
// const { check, validationResult } = require('express-validator');
const md5 = require('js-md5');

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

// [check('password')
// .isEmpty().isLength({ min: 5 }).withMessage('must be 5 chars long'),
// check('email', 'Email is required').isEmpty().isEmail()],

router.post('/signup', (req,res) => {


    let bodyData = req.body;

    let encPass = md5(bodyData.password);

    console.log(encPass);

    bodyData.password = encPass;

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


router.post('/signin',(req,res, next) => {
    let bodyData = req.body;
    let encPass = md5(bodyData.password);
    bodyData.password = encPass;

    UserService.login(bodyData).then(d => {
        if(d) {
                req.session.user = d;
                req.session.isLoggedIn = true;
                res.redirect('/admin')
        }else {
            res.render('signin', {
                layout:'signin-layout',
                title:'SignIn',
                error: 'Password or email is wrong'
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
