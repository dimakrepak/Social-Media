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
        res.status(500).send(err + '')
    }
}
const likePost = async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id)
        if (!post) {
            res.status(404).send(`${err}`)
        } else if (!post.likes.includes(req.user._id)) {
            post.likes.push(req.user.id)
            await post.save()
            res.send(post)
        } else {
            post.likes = post.likes.filter(id => id != req.user._id.toString())
            await post.save()
            res.send(post)
        }
    } catch (err) {
        res.status(500).send()
    }
}
const createComment = async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id)
        if (!post) {
            res.status(404).send(`${err}`)
        } else {
            post.comments.unshift({
                ...req.body,
                username: req.user.username,
            })
            await post.save()
            res.send(post)
        }
    } catch (err) {
        res.status(500).send()
    }
}
const updatePost = async (req, res) => {
    const { body } = req.body
    try {
        const post = await postModel.findOneAndUpdate({ _id: req.params.id, owner: req.user._id }, { body }, { new: true });
        if (!post) {
            res.status(404).send('You can update only your post')
        } else {
            res.status(200).send(post);
        }
    } catch (err) {
        res.status(500).send(err)
    }
}
const getPost = async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id);
        if (!post) {
            res.status(404).send('wrong id')
        } else {
            res.status(200).send(post)
        }
    } catch (err) {
        res.status(500).send(err)
    }
}
const getUserTimeline = async (req, res) => {

    try {
        const currentUser = req.user
        const currentUserPosts = await postModel.find({ owner: currentUser._id })
        const currentUserFollowingPosts = await Promise.all(
            currentUser.following.map((usersId) => {
                return postModel.find({ owner: usersId });
            })
        )
        const timelinePosts = currentUserPosts.concat(...currentUserFollowingPosts)
        res.status(200).send(timelinePosts)
    } catch (err) {
        res.status(500).send(err + "")
    }
}
module.exports = {
    getPost,
    likePost,
    createPost,
    deletePost,
    updatePost,
    getAllPosts,
    createComment,
    getUserTimeline
}