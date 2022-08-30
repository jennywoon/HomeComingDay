const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
var appDir = path.dirname(require.main.filename);


router.post('/mail', async(req, res) => {
    let authNum = Math.random().toString().substr(2,6);
    let emailTemplete;
    ejs.renderFile(appDir+'/template/authMail.ejs', {authCode : authNum}, function (err, data) {
      if(err){console.log(err)}
      emailTemplete = data;
    });

    let transporter = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        secure: false,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS,
        },
    });

    let mailOptions = await transporter.sendMail({
        from: `Homecoming Day`,
        to: 'e79ab10e21-085f16@inbox.mailtrap.io',
        subject: '회원가입을 위한 인증번호를 입력해주세요.',
        html: emailTemplete,
    });


    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        console.log("Finish sending email : " + info.response);
        res.send(authNum);
        transporter.close()
    });
});

module.exports=router;