require('dotenv').config();
const express = require('express');
const router = express.Router();
const UserDB = require('../dbModel/user');
const dto = require('../dbModel/ui-dto-objects');
const mailSender = require("../utils/mailSender")
const otpGenerator = require('../utils/otpGenerator')

// Find a single User with an id

router.post('/user/login', async (req, res) => {
    const { email, password } = req.body;

    try {

        // findUser != null 
        const user = await UserDB.findOne({ email, password });

        if (user != null) {
            const responseStatus = new dto.Status('F200', 'User logged in successfully')
            res.status(200).json(responseStatus);
        } else {
            const responseStatus = new dto.Status('F500', 'Invalid email or password')
            res.status(200).json(responseStatus);

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }

});


router.post('/user/forgetpassword', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserDB.find({ email: email });
        if (user.length == 0) {
            const responseStatus = new dto.Status('F500', 'Invalid email or password')
            res.status(200).json(responseStatus);
        } else {
            const responseStatus = new dto.Status('F200', 'OTP sent Successfully ')
            const forgetpassword_otp = otpGenerator.generateOTP();
            sentMailOTP(user[0].email, forgetpassword_otp);

            await UserDB.findOneAndUpdate({ 'email': email }, {
                $set: {
                    "forgetpassword_otp": forgetpassword_otp,
                    "forgetpassword_otp_dt": Date(),
                }
            })
            res.json(responseStatus)
        }

    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error);
    }
});


function sentMailOTP(email, otp) {
    mailSender.sendMail(email, otp)
}

router.post('/user/forgetpassword/verifyOTP', async (req, res) => {
    try {
        const { email, forgetpassword_otp } = req.body;

        const user = await UserDB.find({
            forgetpassword_otp: forgetpassword_otp,
            email: email,
        });

        if (user.length !== 0) {
            const responseStatus = new dto.Status('F200', 'OTP verifed successfully')
            res.status(200).json(responseStatus);
        } else {
            const responseStatus = new dto.Status('F500', 'Invalid OTP or email ')
            res.json(responseStatus)
        }

    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error);
    }
});

router.post('/user/forgetpassword/changePassword', async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const user = await UserDB.findOne({ email: email });


        if (!user) {
            // Update the password
            const responseStatus = new dto.Status('F500', 'User not found')
            res.status(200).json(responseStatus);
        }
        else {
            // Update the password
            user.password = newPassword;
            await user.save();
            const responseStatus = new dto.Status('F200', 'Password changed successfully')
            res.json(responseStatus)
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error);
    }
});


module.exports = router;