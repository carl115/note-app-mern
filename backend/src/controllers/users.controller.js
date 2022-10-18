const User = require('../models/User')

const usersCtrl = {}

usersCtrl.getUsers = async (req, res) => {
    const users = await User.find()
    
    res.json(users)
}

usersCtrl.createUser = async (req, res) => {
    const { username } = req.body

    const newUser = await new User({ username: username })
    await newUser.save()

    res.json({ message: "User created" })
}

usersCtrl.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id)

    res.json({ message: "User deleted" })
}

module.exports = usersCtrl