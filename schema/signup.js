const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const workerSchema = new mongoose.Schema({
    adharno:{
        type:String,
        required:[true,'Something went wrong']    },
    name:{
        type:String,
        required:[true,'Enter Your Name']
    },
    fathersname:{
        type:String,
        required:[true,"Enter your father's name"]
    },
    phoneno:{
        type:String,
        required:[true,'Something went wrong'],
        maxlength:10,
        minlength:10
    },
    gender:{
        type:String,
        required:[true,'Enter your gender']
    },
    dob:{
       type:Date,
       required:[true,'Enter you date of birth']
    },
    password:{
        type:String,
        required:[true,'Enter Password']
    },
    checknum:{
        type:Number
    },
    vacnum:{
        type:Number
    },
    usernum:{
        type:Number
    },
    feed:[
    {
        date:Date,
        vcode:String,
        uuid:String,
        phoneno:String,
        name:String
    }]

})
const Worker = mongoose.model('Worker',workerSchema);

module.exports = Worker;