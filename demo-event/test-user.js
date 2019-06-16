let user = require('./user-list');


let myUser = new user();


myUser.on('saved-user', function(msg) {
    console.log('Listener Executing')
    console.log(msg)
})


myUser.save({name:'js',pass: 'java'})