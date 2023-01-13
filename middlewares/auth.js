require('dotenv').config({ path: '.env' })
const jwt = require('jsonwebtoken')

// MIDDLEWARE TO CHECK TOKEN
module.exports = (req, res, next) => {

    // read token from header
    const token = req.header('x-auth-token')

    // check if there is no token and role
    if (!token) res.status(403).json({ msg: 'No token, permission denied' })

    // validate token
    try {
        const encrypted = jwt.verify(token, process.env.JWT_SECRET)
        req.user = encrypted.user
        next()
    } catch (error) {
        res.status(422).json({ msg: 'Invalid token' })
    }
}