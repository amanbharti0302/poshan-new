const mongoose = require('mongoose');
const childmdmSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Enter Your Name']
    },
    uuid:{
        type:String,
        required:[true,"Enter your uid name"]
    },
    acode:{
        type:String,
        required:[true,'Something went wrong']
    }
})
const mdm = mongoose.model('childmdmSchema',childmdmSchema);

module.exports = mdm;