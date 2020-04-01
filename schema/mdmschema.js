const mongoose = require('mongoose');
const mdmSchema = new mongoose.Schema({
    number:{
        type:String,
        required:[true,'Enter No of student']
    },
    date:{
        type:String,
        required:[true,"Enter today's Date"]
    },
    acode:{
        type:String,
        required:[true,'Enter Area code']
    }
})
const mdm = mongoose.model('mdmSchema',mdmSchema);
module.exports = mdm;