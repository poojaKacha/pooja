var CONTACT = require('../model/contact')
var bcrypt = require('bcrypt')

exports.contactcreate = async function (req, res, next) {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10)
        let contactuser = await CONTACT.create(req.body)
        res.status(201).json({
            status: "success..!!",
            message: "contact create successfull..!!",
            contactuser
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
};
exports.contactlogin = async function (req, res, next) {
    try {

        let contacCheck = await CONTACT.findOne({ email: req.body.email })
        if (!contacCheck) {
            throw new Error('user not found..!!')
        }
        let passCheck = await bcrypt.compare(req.body.password, contacCheck.password)
        if (!passCheck) {
            throw new Error('password invaild..!!')
        }

        res.status(201).json({
            status: "success..!!",
            message: "contact login successfull..!!",
            contacCheck
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
};
exports.contatfind = async function (req, res, next) {
    try {

        let contactuser = await CONTACT.find(req.body)
        res.status(201).json({
            status: "success..!!",
            message: "contact found successfull..!!",
            contactuser
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
};
exports.contactfindID =  async function (req, res, next) {
    try {

        let contactuser = await CONTACT.findById(req.params.id)
        res.status(201).json({
            status: "success..!!",
            message: "contact found successfull..!!",
            contactuser
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
};
exports.contactupdate =async function (req, res, next) {
    try {
        req.body.password = await bcrypt.hash(req.body.password)
        let data = await CONTACT.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(201).json({
            status: "success..!!",
            message: "contact update successfull..!!",

        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
};
exports.contctdelete =  async function (req, res, next) {
    try {

        let contactuser = await CONTACT.findByIdAndDelete(req.params.id)
        res.status(201).json({
            status: "success..!!",
            message: "contact delete successfull..!!",
            contactuser
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
};
