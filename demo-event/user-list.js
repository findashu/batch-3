let EventEmitter = require('events').EventEmitter;
let util = require('util');


let db = [

    {name:'ashu',pass:'123'},
    {name:'harshita',pass:'12345'},
]

function User () {
    // inheriting eventemitter 
    EventEmitter.call(this);
};

// inherit prototype properties
util.inherits(User,EventEmitter);


User.prototype.save = function (obj) {
    db.push(obj);

    this.emit('saved-user', 'User saved successfully')

    console.log(db)
};

module.exports = User;