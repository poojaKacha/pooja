var express = require('express');
var router = express.Router();
var USERC = require('../controller/users')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix +file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
  

/* GET users listing. */
router.post('/signup',upload.single('profileImage'), USERC.usercreate )

router.post('/login',USERC.userlogin )
router.get('/',USERC.sequre,USERC.userfind )

router.get('/:id',USERC.sequre,USERC.userID)
router.put('/:id',USERC.sequre,USERC.userupdate)
router.delete('/:id',USERC.sequre,USERC.userdelte)

module.exports = router;
