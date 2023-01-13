const jwt = require('jsonwebtoken')

const generateJWT = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '4h' },
            (error, token) => {
                if (error) {
                    console.log(error)
                    reject('Cannot generate the token')
                } else {
                    resolve(token)
                }
            }
        )
    })
}