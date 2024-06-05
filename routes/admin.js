var express = require('express');
var router = express.Router();
var ADMINC = require('../controller/admin')


/* GET users listing. */
router.post('/signup',ADMINC.admincreate )
router.post('/login',ADMINC.adminlogin)



module.exports = router;
