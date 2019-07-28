const Project = require('../models/projectSchema');


// module.exports.projectList = (cb => {
//     Project.find().then(data => {
//         cb(null, data)
//     }).catch(err => cb(err,null))
// })


module.exports.projectList = () => {
    return new Promise((resolve, reject) => {
        Project.find().then(data => {
            resolve(data)
        }).catch(err => reject(err));
    })
}