const express = require('express');
const router = express.Router();
const userController = require('../controllers/user')
const postController = require('../controllers/post')
const auth = require('../middleware/auth')

router
    .post('/register', userController.createUser)
    .post('/login', userController.loginUser)
    .post('/logout', auth, userController.logoutUser)
    .get('/users/me', auth, userController.getUserMe)
    .put('/users/me', auth, userController.updateUser)
    .put('/users/:id/follow', auth, userController.followUser)
    .put('/users/:id/unfollow', auth, userController.unfollowUser)
    .delete('/users/me', auth, userController.deleteUser)


    .post('/posts/create', auth, postController.createPost)
    .post('/posts/comments/:id', auth, postController.createComment)
    .delete('/posts/delete/:id', auth, postController.deletePost)
    .get('/posts', postController.getAllPosts)

module.exports = router;