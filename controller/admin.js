var ADMIN = require('../model/admin')
var bcrypt = require('bcrypt')

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "kachapooja06@gmail.com",
    pass: "altyjllpwvtrbipr",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main(mail) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'kachapooja06@gmail.com', // sender address
    to: mail, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "kacha pooja", // plain text body
    html: "<b>tnx for signup</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

exports.admincreate = async function (req, res, next) {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 10)
      let admincreate = await ADMIN.create(req.body)
      // main(req.body.email)
      res.status(201).json({
        status: "success!",
        data: admincreate
  
      })
    } catch (error) {
      res.status(404).json({
        status: "fail",
        message: error.message
      })
    }
  
};
  
exports.adminlogin = async function (req, res, next) {
    try {
      let userfind = await ADMIN.findOne({ email: req.body.email })
      if (!userfind) {
        throw new Error('user not found')
      }
      let passcheck = await bcrypt.compare(req.body.password, userfind.password)
      if (!passcheck) {
        throw new Error('password invaild')
      }
      res.status(201).json({
        status: "user find successful",
        data: userfind
  
      })
    } catch (error) {
      res.status(404).json({
        status: "fail",
        message: error.message
      })
    }
  
  };
