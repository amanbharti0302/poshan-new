const mongoose = require('mongoose');
const overviewSchema = new mongoose.Schema({
    acode:{
        type:String,
        required:[true,'Something went wrong']    },
    date:{
        type:String
    },
    checknum:{
        type:Number
    },
    vacnum:{
        type:Number
    },
    midnum:{
        type:Number
    }
})

const overview = mongoose.model('overview',adminlistSchema);
module.exports = overview;