const postModel = require('../models/post')

const createPost = async (req, res) => {
    const post = new postModel({
        ...req.body,
        username: req.user.username,
        owner: req.user._id
    })
    try {
        await post.save()
        res.status(201).send(post)
    } catch (err) {
        res.status(400).send(`${err}`)
    }
}
const deletePost = async (req, res) => {
    try {
        const post = await postModel.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if (!post) {
            res.status(404).send(`${err}`)
        }
        res.status(200).send('post deleted')
    } catch (err) {
        res.status(500).send()
    }
}
const getAllPosts = async (req, res) => {
    try {
        const posts = await postModel.find()
        res.send(posts)
    } catch (err) {
        res.status(500).send()
    }
}
const createComment = async (req, res) => {
    const { body } = req.body
    try {
        const post = await postModel.findOne({ _id: req.params.id })
        if (!post) {
            res.status(404).send(`${err}`)
        }
        post.comments.unshift({
            body,
            username: req.user.username,
        })
        await post.save()
        res.send(post)
    } catch (err) {
        res.status(500).send()
    }
}
module.exports = {
    createPost,
    deletePost,
    getAllPosts,
    createComment

}