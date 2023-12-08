require('dotenv').config();
const express = require('express');
const router = express.Router();
const UserDB = require('../dbModel/user');
const dto = require('../dbModel/ui-dto-objects');

//To Create User
router.post('/user', async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName && !email && !password) {
        const responseStatus = new dto.Status('F500', 'Content can not be empty!')
        res.status(400).json(responseStatus);
    }

    const user = new UserDB({
        fullName: fullName,
        email: email,
        password: password,

    });
    await user.save().then(data => {
        res.send({
            message: "User created successfully!!",
            user: data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating user"
        });
    });

});


// router.get('/user/:userId', async (req, res) => {

//     const userId = req.params.userId;

//     try {
//         const user = await UserDB.findById(userId);
//         if (user) {
//             res.json(user);
//         } else {
//             const responseStatus = new dto.Status('F500', 'User not found')
//             res.status(200).json(responseStatus);
//         }
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

module.exports = router;