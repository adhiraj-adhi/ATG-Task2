import mongoose from "mongoose";

const postsSchema = mongoose.Schema({
    postImage: {
        type: String,
        default: ""
    },
    postContent: {
        type: String,
        required: true,
        trim: true
    },
    postlikes: {
        type: Array,  // will contain array of user IDs
        default: []
    },
    postComments: {
        type: [{
            username: {
                type: String,
            },
            comment: {
                type: String
            }
        }],
        default: []
    }
}, {timestamps: true})

const Posts = mongoose.model("post", postsSchema);
export default Posts;