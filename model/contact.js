var mongoose = require('mongoose')
var Schema = mongoose.Schema

var contactSchema = new Schema({
    username: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required:true
    }
})

let CONTACT = mongoose.model('contact', contactSchema)
module.exports = CONTACT