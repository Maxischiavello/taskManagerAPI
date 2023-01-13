const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const authController = require('../controllers/authController')

router.post(
    '/',
    [
        check('email', 'Please enter a valid email address').isEmail(),
        check(
            'password',
            'Password must contain between 8 and 16 characters, including numbers, upper/lowercase letters and do not use spaces.'
        )
            .isLength({ min: 8 })
            .isLength({ max: 16 })
    ],
    authController.loginUser
)

module.exports = router;