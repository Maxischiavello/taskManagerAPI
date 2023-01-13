const User = require("../models/User")
const bcryptjs = require("bcryptjs")
const { validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")

/**
 * Login User
 */
const loginUser = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() })

  const { email, password } = req.body

  try {
    let user = await User.findOne({ email })

    if (!user) res.status(401).json({ msg: "Incorrect user and/or password" })

    const passwordCheckup = await bcryptjs.compare(password, user.password)

    if (!passwordCheckup) res.status(401).json({ msg: "Incorrect user and/or password" })

    const payload = { user: { id: user.id } }

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (error, token) => {
        if (error) throw error
        res.status(200).json({ token: token, msg: "Login successfuly" })
      }
    )
  } catch (error) {
    console.log(error);
    res.status(422).json({ msg: "Sorry, something went wrong" })
  }
}

module.exports = {
  loginUser,
}