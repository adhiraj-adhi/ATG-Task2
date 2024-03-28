import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        min: [3, "Name must be 6 characters long"],
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        min: 5
    },
    profilePicture: {
        type: String,
        default: ""
    },
    userPosts: {
        type: Array,
        default: []
    },
    about: {
        type: String,
        max: [50, "Character Limit exceeded"],
    },
    city: {
        type: String,
        max: [50, "Character Limit exceeded"],
    },
    relationship: {
        type: String,
        default: "Single"
    }
}, { timestamps: true })

const User = mongoose.model("user", userSchema);
export default User;