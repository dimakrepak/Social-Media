const express = require('express');
const router = express.Router();
const userController = require('../controllers/user')
const postController = require('../controllers/post')
const auth = require('../middleware/auth')

router
    .post('/register', userController.createUser)
    .post('/login', userController.loginUser)
    .post('/logout', auth, userController.logoutUser)
    .put('/users/me', auth, userController.updateUser)
    .delete('/users/me', auth, userController.deleteUser)


    .post('/posts/create', auth, postController.createPost)
    .post('/posts/comments/:id', auth, postController.createComment)
    .delete('/posts/delete/:id', auth, postController.deletePost)
    .get('/posts', postController.getAllPosts)

module.exports = router;