const User = require('../models/userSchema');


module.exports.createUser = (data) => {
    return new Promise((resolve,reject) => {

        let usr = new User(data);

        usr.save().then(data => {
            resolve(data)
        }).catch(err => reject(err))

    })
}


module.exports.login = (em) => {
    return new Promise((resolve, reject) => {
        
        User.findOne({email: em}).then(data => {
            resolve(data)
        }).catch(err => reject(err));

    })
}