const mongoose = require('mongoose');
const { Schema } = mongoose;

// This is model for blogs
const BlogSchema = new Schema({
    author: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    topic: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }
})

const Blog = mongoose.model('blog', BlogSchema);
Blog.createIndexes();
module.exports = Blog;