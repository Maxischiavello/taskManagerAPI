const express = require('express')
const router = express.Router()
const { getUser, addUser, updateUser, deleteUser } = require('../controllers/userController')
const { check } = require('express-validator')
const auth = require('../middlewares/auth')
const { validateFields } = require('../middlewares/validateFields')

router.get('/:id', auth, getUser)
router.post(
    '/',
    [
        check('username', 'The username field is required').not().isEmpty(),
        check('email', 'Please enter a valid email address').isEmail(),
        check(
            'password',
            'Password must contain between 8 and 16 characters, including numbers, upper/lowercase letters and do not use spaces.'
        )
            .isLength({ min: 8 })
            .isLength({ max: 16 })
            .matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,12}$/),
        validateFields,
    ],
    addUser
)
router.put('/:id', auth, updateUser)
router.delete('/:id', auth, deleteUser)

module.exports = router