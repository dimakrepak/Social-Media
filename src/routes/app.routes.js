const express = require('express');
const router = express.Router();
const userController = require('../controllers/user')
const postController = require('../controllers/post')
const auth = require('../middleware/auth')
const uploadFile = require('../middleware/multer.upload')

router
    .post('/register', userController.createUser)
    .post('/login', userController.loginUser)
    .post('/logout', auth, userController.logoutUser)
    .get('/users/me', auth, userController.getUserMe)
    .get('/user', userController.getUser)
    .put('/users/me', auth, userController.updateUser)
    .put('/users/:id/follow', auth, userController.followUser)
    .put('/users/:id/unfollow', auth, userController.unfollowUser)
    .delete('/users/me', auth, userController.deleteUser)

    .post('/posts/create', auth, postController.createPost)
    .put('/posts/:id/like', auth, postController.likePost)
    .put('/posts/:id/comment', auth, postController.createComment)
    .put('/posts/:id/update', auth, postController.updatePost)
    .delete('/posts/:id/delete', auth, postController.deletePost)
    .get('/posts', postController.getAllPosts)
    .get('/posts/user/:id', postController.getUserPosts)
    .get('/post/:id', postController.getPost)
    .get('/posts/me', auth, postController.getCurrentUserPosts)
    .get('/posts/timeline/me', auth, postController.getUserTimeline)

module.exports = router;