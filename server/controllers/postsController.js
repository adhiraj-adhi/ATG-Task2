import Posts from '../db/models/postsModel.js'
import User from '../db/models/userModel.js'
import { fileURLToPath } from 'url';
import fs from 'fs'
import path from 'path'

export const getAllPosts = async (req, res) => {
    try {
        const result = await Posts.find();
        if (result) {
            res.json({ message: result });
        }
    }
    catch (error) {
        console.log(error);
    }
}


// We are not seeting below routes as authenticated for now...

export const getUsersData = async (req, res) => {
    const id = req.query.id;
    try {
        const user = await User.findById({ _id: id });
        if (user) {
            const postIds = user.userPosts;
            const userPosts = [];
            for (let i = 0; i < postIds.length; i++) {
                const post = await Posts.findById(postIds[i]);
                if (post) {
                    userPosts.push(post);
                }
            }
            res.json({
                message: {
                    userData: {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        profilePicture: user.profilePicture,
                        about: user.about,
                        city: user.city,
                        relationship: user.relationship
                    },
                    posts: userPosts
                }
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}

export const createAPost = async (req, res) => {
    const data = req.body;
    console.log(data);

    let post;
    if (req.file) {
        post = {
            postImage: req.file.filename,
            postContent: data.postContent
        };
    } else {
        post = {
            postContent: data.postContent
        };
    }

    try {
        const result = await Posts.create(post);
        const user = await User.findById({ _id: data.id });
        user.userPosts.push(result._id);
        const userUpdated = await user.save();
        if (result && userUpdated) {
            res.status(201).json({ message: "Post Created Success" })
        }
    }
    catch (error) {
        console.log(error);
    }
}

export const updateThePost = async (req, res) => {
    const postId = req.body.postId;
    try {
        const post = await Posts.findById({ _id: postId });
        if (post) {
            if (req.file) {
                // deleting previous file:
                const __filename = fileURLToPath(import.meta.url); // getting filename
                const __dirname = path.dirname(__filename);  // getting directory name

                // Delete the file
                const filePath = path.join(__dirname, `../public/postsImages/${post.postImage}`);
                fs.unlink(filePath, (err) => {
                    if (err) {
                        // Handle error while deleting file
                        console.error('Error deleting file:', err);
                        return;
                    }

                    console.log('File deleted successfully');
                });

                // updates
                post.postContent = req.body.postContent;
                post.postImage = req.file.filename
            } else {
                post.postContent = req.body.postContent;
            }
            const result = await post.save();
            if(result){
                res.status(202).json({ message: "Updation Successful", post: result })
                console.log(result);
            }
        } else {
            throw new Error("No such Post")
        }
    }
    catch (error) {
        console.log(error);
    }
}

export const deleteThePost = async (req, res) => {
    const id = req.body.id;
    try {
        const post = await Posts.findByIdAndDelete({ _id: id });
        if (post) {
            res.status().json({ message: "Deletion Successful" })
        } else {
            throw new Error("No such Post")
        }
    }
    catch (error) {
        console.log(error);
    }
}

export const likeThePost = async (req, res) => {
    const ids = req.body;
    try {
        const post = await Posts.findById({ _id: ids.postId });
        if (post) {
            const index = post.postlikes.indexOf(ids.userId);
            console.log(index);
            if (index === -1) {
                post.postlikes.push(ids.userId);
            } else {
                post.postlikes.splice(index, 1);
            }

            const result = await post.save();
            if (result) {
                console.log("Updated");
                res.status(202).json({ message: "Updated", likes: post.postlikes })
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export const addCommentOnPost = async (req, res) => {
    const data = req.body;
    console.log(data);
    try {
        const post = await Posts.findById({_id: data.postId});
        if(post){
            const user = await User.findById({_id: data.userId});
            post.postComments.push({username: user.username, comment: data.comment});
            const result = await post.save();
            if(result){
                res.status(202).json({message: "Comment Added", comments: result.postComments});
            }
        }    
    } 
    catch (error) {
        console.log(error);
    }
}