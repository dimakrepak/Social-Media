const mongoose = require('mongoose');
// const validator = require('validator');

const postSchema = mongoose.Schema({
    body: { type: String },
    username: { type: String },
    createdAt: { type: Date, default: Date.now, },
    comments: [
        {
            body: { type: String },
            username: { type: String },
            createdAt: { type: Date, default: Date.now, },
        }
    ],
    likes: [
        {
            username: { type: String },
            createdAt: { type: Date, default: Date.now, },
        }
    ],
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },

});
module.exports = mongoose.model('Post', postSchema);