const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type:String, required:true},
    email: {type: String, unique:true, required:true, trim:true},
    mobile: Number,
    password: {type:String, required:true},
    createdOn: {type:Date, default: new Date()},
    updatedOn : Date
});

module.exports = mongoose.model('users', userSchema);