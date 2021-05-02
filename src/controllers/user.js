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
const updateUser = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['email', 'password'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates' });
    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.status(200).send(req["user"])
    } catch (err) {
        res.status(400).send(err);
    }
}
const deleteUser = async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (err) {
        res.status(500).send()
    }
}
const followUser = async (req, res) => {

}
const unfollowUser = async (req, res) => {

}
module.exports = {
    createUser,
    loginUser,
    logoutUser,
    updateUser,
    deleteUser

}