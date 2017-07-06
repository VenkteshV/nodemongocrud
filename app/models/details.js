const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Detail = new Schema({
    _id: Number,
    firstname: String,
    lastname: String,
    company:  String,
    location: String,
    package: Number,
    higher: String,
    cgpa:  Number
});



module.exports = mongoose.model('details', Detail);
