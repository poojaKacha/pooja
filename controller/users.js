var USER = require('../model/users')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');

exports.sequre = async function (req, res, next) {
    try {
        let token = req.header.authorization
        if (!token) {
            throw new Error('plz attach token')
        }
        var decoded = jwt.verify(token)
        req.userid = decoded.id
        let usercreate = await USER.findById(decoded.id)
        if (!usercreate) {
            throw new Error('user not found')
        }
        next()
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message

        })
    }
}
exports.usercreate = async function (req, res, next) {
    try {
        req.body.profileImage = req.file.filename
        req.body.password = await bcrypt.hash(req.body.password, 10)
        let usercraete = await USER.create(req.body)
        res.status(201).json({
            status: "create successfull",
            data: usercraete
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message

        })
    }
};
exports.userlogin = async function (req, res, next) {
    try {
        let usercraete = await USER.findOne({ email: req.body.email })
        if (!usercraete) {
            throw new Error('user not found')
        }
        let passverif = await bcrypt.compare(req.body.password, usercraete.password)
        if (!passverif) {
            throw new Error('password invaild')

        }
        var token = jwt.sign({ id: usercraete._id }, 'DEMO');



        res.status(201).json({
            status: "user login successfull",
            data: usercraete,
            token
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message

        })
    }
};
exports.userfind = async function (req, res, next) {
    try {

        let usercraete = await USER.find(req.body)
        res.status(201).json({
            status: "create successfull",
            data: usercraete
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message

        })
    }
};
exports.userID = async function (req, res, next) {
    try {

        let usercraete = await USER.findById(req.params.id)
        res.status(201).json({
            status: "create successfull",
            data: usercraete
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message

        })
    }
};
exports.userupdate = async function (req, res, next) {
    try {
        req.body.password = await bcrypt.hash(req.body.password)
        let data = await USER.findById(req.params.id, req.body, { new: true })
        res.status(201).json({
            status: "user update successfull",

        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message

        })
    }
};
exports.userdelte = async function (req, res, next) {
    try {

        let userdelte = await USER.findByIdAndDelete(req.params.id)
        res.status(201).json({
            status: "user delte successfull",

        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message

        })
    }
};