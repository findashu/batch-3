const express = require('express');
const router = express.Router();
const multer = require('multer');
const unzip = require('unzip');
const fs = require('fs');
const Project = require('../models/projectSchema');
const ProjectService = require('../services/projectService');
const path = require('path');
const UploadService = require('../services/uploadService');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../static/images/projects/'))
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })



var upload = multer({storage: storage});

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



router.get('/projects/:alias', (req,res,next) =>{
    let alias = req.params.alias;

    console.log(alias);

    ProjectService.getProjectDetail(alias).then(data => {
        res.render('admin/projectDetail', {
            title: 'Project Detail',
            layout:'admin-layout',
            project:data
        })
    }).catch(err => next(err))
    
})



router.get('/projects/delete/:alias', (req,res,next) => {
    let alias = req.params.alias;

    // console.log(alias);


    ProjectService.deleteProject(alias).then(d => {
        res.redirect('/admin/projects')
    }).catch(err => next(err))


})


router.post('/projects/update/:alias', (req,res,next) =>{
    let alias = req.params.alias;
    let bodyData = req.body;

    let classes = ['primary', 'danger', 'success', 'warning'];

    let tags = bodyData.tags.split(',');

    let fT = [];

    for(let i =0; i< tags.length; i++) {
        var t = {
            name: tags[i],
            class: classes[i] ? classes[i] : 'info'
        }
        fT.push(t);
    }

    bodyData.tags = fT ;
    bodyData.updatedOn = new Date();
    
    console.log(alias);

    console.log(bodyData);

    ProjectService.updateProject(alias,bodyData).then(d => {
        res.redirect('/admin/projects');
    }).catch(err => next(err))

});


router.get('/projects/:alias/upload', (req,res) => {
    res.render('admin/upload', {
        title:'Upload Media',
        layout:'admin-layout',
        fieldName : 'img',
        actionUrl : `/admin/projects/${req.params.alias}/upload-img`
    })
});


router.post('/projects/:alias/upload-img', upload.single('img') ,(req,res,next) => {


    console.log(req.file);

    ProjectService.updateProject(req.params.alias,{image: `/images/projects/${req.file.filename}`}).then(d => {
        res.redirect('/admin/projects');
    }).catch(err => next(err))

})

router.get('/projects/:alias/upload-demo', (req,res) => {
    res.render('admin/upload', {
        title: 'Upload Demo',
        layout:'admin-layout',
        fieldName: 'demo',
        actionUrl : `/admin/projects/${req.params.alias}/upload-demo`
    })
});



router.post('/projects/:alias/upload-demo', (req,res,next) => {

    let fileName = req.params.alias+".zip";

    let dir = path.join(__dirname, '../static/project-demos/'+req.params.alias);

    function uploaded(err,d) {
        if(err) {
            next(err)
        }else {

            let path = dir+"/"+fileName

            fs.createReadStream(path).pipe(unzip.Extract({path:dir}));

            fs.unlinkSync(path);

            res.redirect('/admin/projects');
        }
    }


    UploadService.uploadDemo(req, res, fileName, dir,uploaded);

    
})

module.exports = router;
