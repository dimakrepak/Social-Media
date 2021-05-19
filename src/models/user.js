const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const postModel = require('../models/post');

const userSchema = mongoose.Schema({
    username: { type: String, required: true, minlength: 2, maxlength: 20, unique: true },
    password: { type: String, required: true, minlength: 6 },
    email: {
        type: String, required: true, unique: true,
        validate(value) {
            if (!validator.isEmail(value)) { throw new Error('Email is invalid') };
        }
    },
    profilePicture: { type: String, default: "" },
    followers: { type: Array, default: [] },
    following: { type: Array, default: [] },
    isAdmin: { type: Boolean, default: false },
    desc: { type: String, max: 100 },
    city: { type: String, max: 50 },
    from: { type: String, max: 50 },
    languages: { type: String, max: 50 },
    hobbies: { type: String, max: 50 },
    tokens: [{
        token: { type: String, required: true }
    }]
},
    { timestamps: true }
);
//Delete password and tokens from JSON
userSchema.methods.toJSON = function () {
    const user = this;
    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.tokens;
    return userObj;
};
//Generate Token
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'tokeninaction')
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
};
//Check if email/password was found in user collection if yes return user else throw error
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await userModel.findOne({ email })
    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
};
//Delete users posts when user is removed
userSchema.pre('remove', async function (next) {
    const user = this
    await postModel.deleteMany({ owner: user._id })
    next()
})

//Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next();
});
const userModel = mongoose.model('User', userSchema);
module.exports = userModel