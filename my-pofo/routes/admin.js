const express = require('express');
const router = express.Router();

const Project = require('../models/projectSchema');
const ProjectService = require('../services/projectService');


const data = require('../my-data')


router.get('/', (req,res) => {
    res.render('admin/index', {
        title: 'Admin',
        layout:'admin-layout'
    })
});



router.get('/projects', (req,res,next) => {


    // function callback(err,data) {
    //     if(err) {
    //         next(err)
    //     }else {
    //         res.render('admin/projects', {
    //             title: 'Project List',
    //             layout:'admin-layout',
    //             projects: data
    //         })
    //     }
    // }

    ProjectService.projectList().then(data => {
        res.render('admin/projects', {
            title: 'Project List',
            layout:'admin-layout',
            projects: data
        })
    }).catch(err => next(err));
    
})



router.get('/projects/create-new', (req,res) => {
    res.render('admin/create-project', {
        title:'Create Project',
        layout: 'admin-layout'
    })
})


router.post('/projects/create-new', (req,res,next) => {
    let bodyData = req.body;

    let project = bodyData;

    project.alias = bodyData.name.split(' ').join('-').toLowerCase();

    let classes = ['primary', 'danger', 'success', 'warning'];

    let tags = bodyData.tag.split(',');

    let fT = [];

    for(let i =0; i< tags.length; i++) {
        var t = {
            name: tags[i],
            class: classes[i] ? classes[i] : 'info'
        }
        fT.push(t);
    }

    project.tags = fT || [];

    let newProj = new Project(project);

    newProj.save().then(data => {

        console.log('saved Data', data)
        res.redirect('/admin/projects');

    }).catch(err => {
        next(err);
    })
})



router.get('/projects/:alias', (req,res) =>{
    let alias = req.params.alias;

    let index = data.projectIndex[alias];
    let project = data.myProjects[index];


    res.render('admin/projectDetail', {
        title: 'Project Detail',
        layout:'admin-layout',
        project:project
    })
})

module.exports = router;
