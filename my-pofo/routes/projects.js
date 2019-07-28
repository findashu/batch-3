const express = require('express');
const router = express.Router();
const ProjectService = require('../services/projectService')
const data = require('../my-data')


router.get('/', function(req,res,next) {
    
    // function callback(err,data) {
    //     if(err) {
    //         next(err)
    //     }else {
    //         res.render('projects', {
    //             layout:'layout',
    //             title:'Projects',
    //             projects: data,
    //             hasNavProject : true
    //         })
    //     }
    // }


    ProjectService.projectList().then(data => {
        res.render('projects', {
            layout:'layout',
            title:'Projects',
            projects: data,
            hasNavProject : true
        })
    }).catch(err => next(err))
});



router.get('/:alias', function(req,res) {
    let alias = req.params.alias;
    let index = data.projectIndex[alias];
    let project = data.myProjects[index];
    res.render('project-detail', {
        title : 'Project',
        projectDetail: project
    })   
})


module.exports = router;