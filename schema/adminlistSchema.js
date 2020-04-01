const mongoose = require('mongoose');
const adminlistSchema = new mongoose.Schema({
    adharno:{
        type:String,
        required:[true,'Something went wrong']    },
    phoneno:{
        type:String,
        required:[true,'Something went wrong'],
        maxlength:10,
        minlength:10
    },
    area:{
       type:String,
       required:[true,'Enter Area']
    },
    acode:{
        type:String,
       required:[true,'Enter Area']
    },
    otp:{
        type:String
    }
})

const adminlist = mongoose.model('adminlist',adminlistSchema);
module.exports = adminlist;