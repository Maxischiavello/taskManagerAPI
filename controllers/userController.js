const User = require("../models/User")
const bcryptjs = require("bcryptjs")

/**
 * Get user by id
 */
const getUser = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.params.id }).select("-password")
    res.status(200).json(user)
  } catch (error) {
    res.status(404).json(error).send("There is no user with this id")
  }
}

/**
 * Get all users
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password")
    res.status(200).json(users)
  } catch (error) {
    res.status(422).json({ msg: "Sorry, something went wrong" })
  }
}

/**
 * Create a user
 */
const addUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email })

    if (user) {
      return res
        .status(409)
        .json({ msg: "A user already exist with this email address" })
    }

    user = new User(req.body)
    const salt = await bcryptjs.genSalt(10)
    user.password = await bcryptjs.hash(password, salt)

    await user.save()

    res.status(201).json({ msg: `User created` })
  } catch (error) {
    console.log(error);
    res.status(422).json({ msg: "Sorry, something went wrong" })
  }
}

/**
 * Update user by id
 */
const updateUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
    res.status(200).json({ msg: "User has been updated" })
  } catch (error) {
    res.status(422).json({ msg: "Sorry, something went wrong" })
  }
}

/**
 * Delete client by id
 */
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndRemove({ _id: req.params.id })
    res.status(200).json({ msg: "User has been deleted" })
  } catch (error) {
    res.status(404).json(error).send("There is no user with this id")
  }
}

module.exports = {
  getAllUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
}