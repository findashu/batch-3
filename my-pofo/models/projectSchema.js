const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const projectSchema = new Schema({

    name : {
        type: String,
        required: true,
        validate: {
            validator : function(value) {
                return value.length > 3
            },
            message: 'Length should be greater than 3'
        }
    },
    alias: {type: String, unique:true, required: true},
    githubUrl: String,
    image : String,
    description: String,

    tags : [{
        name: String,
        class: String
    }],
    imageSliders : [String],
    relatedProjects: [{
        name: String,
        link: String
    }],

    createdOn : {type: Date, default: Date.now()},
    updatedOn: Date,
    createdBy: {type:String, enum: ['user', 'admin'], default:'admin'}
});



// THis returns the whole collection

module.exports = mongoose.model('projects', projectSchema);