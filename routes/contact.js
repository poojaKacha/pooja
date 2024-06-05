var express = require('express');
var router = express.Router();
var contactC = require('../controller/contact')

/* GET home page. */
router.post('/signup', contactC.contactcreate)
router.post('/login',contactC.contactlogin )

router.get('/',contactC.contatfind )
router.get('/:id',contactC.contactfindID)
router.put('/:id',contactC.contactupdate )
router.delete('/:id',contactC.contctdelete)


module.exports = router;
