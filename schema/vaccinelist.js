const mongoose = require('mongoose');
const vaccineSchema = new mongoose.Schema({
    vcode:{
        type:String
    },
    name:{
        type:String,
        required:[true,'Enter Name of vaccine']
    },
    for:{
        type:String
    },
    when:{
        type:String,
        required:[true,"Enter your father's name"]
    },
    dose:{
       type:String,
       required:[true,'Enter year for eligibility']
    },
    route:{
        type:String
    },
    site:{
        type:String
    }
})
const vaccine = mongoose.model('vaccinelist',vaccineSchema);

module.exports = vaccine;