const mongoose = require('mongoose');
// const validator = require('validator');

const postSchema = mongoose.Schema({
    body: { type: String },
    username: { type: String },
    img: { type: String },
    likes: { type: Array, default: [] },
    comments: [
        {
            body: { type: String },
            username: { type: String },
            createdAt: { type: Date, default: Date.now, },
        }
    ],
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
},
    { timestamps: true }
);
module.exports = mongoose.model('Post', postSchema);