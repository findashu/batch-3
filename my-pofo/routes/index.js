const data = require('../my-data')

module.exports.index = function(req,res) {
    res.render('index', {
        title:'My Portfolio',
        hasNavHome : true
    })
}


module.exports.project = function(req, res) {
    // console.log(data.myProjects);
    res.render('projects', {
        layout:'layout',
        title:'Projects',
        projects: data.myProjects,
        hasNavProject : true
    })
}


module.exports.projectDetail = function(req,res) {

    let alias = req.params.alias;
    let index = data.projectIndex[alias];
    let project = data.myProjects[index];

    console.log(project)

    console.log(req.params.alias)
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
    {email:'test@test.com', password:'test'},
    {email:'ashu@ashu.com', password:'ashu'}

]


module.exports.doSignin = (req,res, next) => {

    let bodyData = req.body;

    let usr = users.filter(e => e.email === bodyData.email)[0];

 
    console.log(usr)


    if(usr.password === bodyData.password) {
        res.render('admin', {
            title:'Admin'
        })
    }else {
        next(new Error('Password is wrong'))
    }

    

}