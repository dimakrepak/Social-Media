const userModel = require('../models/user');

const createUser = async (req, res) => {

    const user = new userModel(req.body)
    try {
        const token = await user.generateAuthToken()
        await user.save();
        res.status(201).send({ user, token })
    } catch (err) {
        res.status(400).send(`${err}`)
    }
}
const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.findByCredentials(email, password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (err) {
        res.status(400).send(`${err}`)
    }
}
const logoutUser = async (req, res) => {
    const user = req.user
    try {
        user.tokens = user.tokens.filter((token) => token.token !== req.token)
        await req.user.save()
        res.send('You have been logged out')
    } catch (err) {
        res.status(500).send(err)
    }
}
module.exports = {
    createUser,
    loginUser,
    logoutUser
}