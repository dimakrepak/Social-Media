const express = require('express');
const router = express.Router();
const userController = require('../controllers/user')
const postController = require('../controllers/post')
const auth = require('../middleware/auth')

router
    .post('/register', userController.createUser)
    .post('/login', userController.loginUser)
    .post('/logout', auth, userController.logoutUser)

module.exports = router;