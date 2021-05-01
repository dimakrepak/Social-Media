const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    username: { type: String, required: true, },
    password: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) { throw new Error('Email is invalid') };
        }
    },
    tokens: [{
        token: { type: String, required: true }
    }]

});
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'tokeninaction')
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}
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
}
//Delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
    const user = this
    await transModel.deleteMany({ owner: user._id })
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