const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const Post = require("./post")

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            index: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model("user", userSchema);
