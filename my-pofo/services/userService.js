const User = require('../models/userSchema');


module.exports.createUser = (data) => {
    return new Promise((resolve,reject) => {

        let usr = new User(data);

        usr.save().then(data => {
            resolve(data)
        }).catch(err => reject(err))

    })
}


module.exports.login = (data) => {
    return new Promise((resolve, reject) => {
        
        User.findOne(data).then(data => {
            resolve(data)
        }).catch(err => reject(err));

    })
}