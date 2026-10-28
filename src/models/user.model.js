const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
        username: {
            type: String,
            required: [true, "Username is required"],
            trim: true
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Enter a valid email"]
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters"],
            select: false
        }
    },
    {timestamps: true}
);

const User = mongoose.model("User", userSchema);
module.exports = User;

