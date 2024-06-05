const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const adminSchema = new Schema({
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
});
let ADMIN = mongoose.model('admin', adminSchema)
module.exports = ADMIN
