const Project = require('../models/projectSchema');


// module.exports.projectList = (cb) => {
//     Project.find().then(data => {
//         cb(null, data)
//     }).catch(err => cb(err,null))
// }


module.exports.projectList = () => {
    return new Promise((resolve, reject) => {
        Project.find().then(data => {
            resolve(data)
        }).catch(err => reject(err));
    })
};


module.exports.getProjectDetail = (alias) => {
    return new Promise(async (resolve, reject) => {


        try {
            let data = await Project.findOne({alias:alias});
            let count = await Project.find().count()

            console.log('count', count)
            resolve(data)
        } catch (error) {
            reject(err)
        }

        // Project.findOne({alias:alias}).then(data => {
        //    resolve(data)
        // }).catch(err => reject(err))
    })
}

module.exports.deleteProject = (alias) => {
    return new Promise((resolve,reject) => {
        
        Project.findOneAndDelete({alias:alias}).then(data => {
            resolve(data)
        }).catch(err => reject(err));

    })
}



module.exports.updateProject = (alias, data) => {
    return new Promise((resolve, reject) => {


        Project.findOneAndUpdate({alias:alias}, {$set: data, $inc:{__v:1}}, {new:true}).then(data => {
            resolve(data)
        }).catch(err => reject(err))

    })
}


