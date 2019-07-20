const data = require('../my-data')
const MongoClient = require('mongodb').MongoClient;

const dbUrl = 'mongodb://localhost:27017';

let db;

MongoClient.connect(dbUrl, {useNewUrlParser: true}, function(err, client) {
    if(err) {
        console.log(err)
    }else {
        console.log('Successfuly connected to DB ');
        db = client.db('batch-3');
    }
})



module.exports.index = function(req,res) {

    res.render('index', {
        title:'My Portfolio',
        hasNavHome : true
    })
}


module.exports.project = function(req, res,next) {

    let projectCollection = db.collection('projects');


    projectCollection.find().toArray((err, data) => {
        if(err) {
            console.log(err)
            next(err);
        }else {
            console.log('Project Data');
            console.log(data)

            res.render('projects', {
                layout:'layout',
                title:'Projects',
                projects: data,
                hasNavProject : true
            })
        }
    })


    
}

module.exports.projectDetail = function(req,res) {

    let alias = req.params.alias;
    let index = data.projectIndex[alias];
    let project = data.myProjects[index];
    res.render('project-detail', {
        title : 'Project',
        projectDetail: project
    })   
}


module.exports.signin = (req,res) => {
   
    res.render('signin', {
        layout:'signin-layout',
        title:'SignIn'
    })
}

let users = [
    {name:'ashu',email:'test@test.com', password:'test'},
    {name:'ashu',email:'ashu@ashu.com', password:'ashu'}
]

module.exports.doSignin = (req,res, next) => {
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
}

module.exports.admin = (req,res) => {
    res.render('admin/index', {
        title: 'Admin',
        layout:'admin-layout'
    })
}


module.exports.signout = (req,res) => {
    req.session.isLoggedIn = false;
    req.session.user = {};

    res.redirect('/');
}

module.exports.adminProjects = (req,res) => {
    res.render('admin/projects', {
        title: 'Project List',
        layout:'admin-layout',
        projects: data.myProjects
    })
}

module.exports.adminProjectDetail = (req,res) =>{

    let alias = req.params.alias;

    let index = data.projectIndex[alias];
    let project = data.myProjects[index];


    res.render('admin/projectDetail', {
        title: 'Project Detail',
        layout:'admin-layout',
        project:project
    })

}


module.exports.createProject = function(req,res) {
    res.render('admin/create-project', {
        title:'Create Project',
        layout: 'admin-layout'
    })
}


module.exports.doCreateProject = function (req,res,next) {

    let bodyData = req.body;

    let project = bodyData;


    project.alias = bodyData.name.split(' ').join('-').toLowerCase();


    let projectCollection = db.collection('projects');


    projectCollection.insertOne(project, function(err,data) {
        if(err) {
            console.log(err)
            next(err);

        }else {
            console.log('data created')
          
            res.redirect('/admin/projects');
        }
    })
   
}