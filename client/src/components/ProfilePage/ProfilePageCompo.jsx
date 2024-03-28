import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import "./styles.css"
import { IoLocationSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { FaShareAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { getUserData, createPost, updatePost, updateLikeAPI, userComment } from '../../apis/postsAPI';


const ProfilePageCompo = () => {
    const [showPostsForm, setShowPostsForm] = useState(false);
    const navigate = useNavigate();
    const [userDatas, setUserDatas] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const { id } = useParams();
    const [updatePostData, setUpdatePostData] = useState({ postId: "", postContent: "", image: "" });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUserData(id);
                console.log(response.data.message);
                setUserDatas(response.data.message);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
                // Set loading to false whether data is fetched successfully or not
            }
        };

        fetchData();
    }, []);

    // handling creation of post:-
    const [createPostData, setCreatePostData] = useState({
        postDescription: "",
        image: ""
    })
    const collectFormData = (e) => {
        setCreatePostData({ ...createPostData, [e.target.name]: e.target.value })
    }
    function handleImage(e) {
        setCreatePostData({ ...createPostData, image: e.target.files[0] });
    }
    const handlePostCreation = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('postContent', createPostData.postDescription);
        formData.append('image', createPostData.image);
        formData.append('id', userDatas.userData.id)

        try {
            const response = await createPost(formData);
            if (response.data.message) {
                setShowPostsForm(!showPostsForm);
                // navigate(`/profile/${response.message.id}`)
                navigate('/home', { state: { data: userDatas.userData } })
            }
        } catch (error) {
            console.error("Error creating user:", error);
        }
    }


    // function to update like:
    const updateLike = async (postId) => {
        const ids = {
            userId: userDatas.userData.id,
            postId: postId
        }

        try {
            console.log(postId);
            const response = await updateLikeAPI(ids);
            if (response.data.message) {
                const index = userDatas.posts.findIndex(post => post._id === postId);
                if (index !== -1) {
                    const updatedPosts = [...userDatas.posts];
                    updatedPosts[index].postlikes = response.data.likes;
                    setUserDatas({ ...userDatas, posts: updatedPosts });
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    // post updation stuffs:
    const collectUpdateFormaData = (e) => {
        setUpdatePostData({ ...updatePostData, postContent: e.target.postDescription });
    }

    const handleUpdationImage = (e) => {
        setUpdatePostData({ ...updatePostData, image: e.target.files[0] })
    }

    const handlePostUpdation = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('postContent', updatePostData.postContent);
        formData.append('image', updatePostData.image);
        formData.append('postId', updatePostData.postId)

        try {
            const response = await updatePost(formData);
            if (response.data.message) {
                setShowPostsForm(!showPostsForm);
                const index = userDatas.posts.findIndex(post => post._id === updatePostData.postId);
                if (index !== -1) {
                    const updatedPosts = [...userDatas.posts];
                    updatedPosts[index] = response.data.post;
                    setUserDatas({ ...userDatas, posts: updatedPosts });
                }

                setUpdatePostData({ postId: "", postContent: "", image: "" });
            }
        } catch (error) {
            console.error(error);
        }
    }

    // handling comment feature:
    const [commentData, setCommentData] = useState({ comment: "", postId: "", userId: "" });

    const collectComment = (e) => {
        setCommentData({ ...commentData, comment: e.target.value });
    }

    const handleComment = async (postId) => {
        const newComment = { ...commentData, postId: postId, userId: userDatas.userData.id };
        try {
            const response = await userComment(newComment);
            if (response.data.message) {
                const index = userDatas.posts.findIndex(post => post._id === postId);
                if (index !== -1) {
                    const updatedPosts = [...userDatas.posts];
                    updatedPosts[index].postComments = response.data.comments;
                    setUserDatas({ ...userDatas, posts: updatedPosts });
                    // setAllPosts(updatedPosts);
                }
            }
            setCommentData({ comment: '', postId: '', userId: '' });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {
                isLoading ? (<h3>Loading...</h3>) : (
                    <>
                        <div className='profilePageContainer'>
                            <div className='userDetails'>
                                <div className="profilePic">
                                    {/* <img src="https://www.theloadout.com/wp-content/uploads/2021/02/ps5-vr-announcement.jpg" alt="profileImg" /> */}
                                    <img src={`http://localhost:8000/profilePictures/${userDatas.userData.profilePicture}`} alt="profileImg" />
                                </div>
                                <div className="userInfo">
                                    <h3 className='username'>{userDatas.userData.username}</h3>
                                    <p className='about'>{userDatas.userData.about}</p>
                                    <ul>
                                        <li><IoLocationSharp style={{ fontSize: "0.9rem", color: "blue" }} /> {userDatas.userData.city}</li>
                                        <li><FaHeart style={{ fontSize: "0.8rem", color: "red" }} /> {userDatas.userData.relationship}</li>
                                    </ul>

                                    <div className='profileDirector'>
                                        {/* <button><Link to={"/home"} style={{ textDecoration: "none", color: "#ffffff" }}>Go to home</Link></button> */}
                                        <button onClick={() => navigate('/home', { state: { data: userDatas.userData } })}>Go to home</button>
                                        <button><Link to={"/login"} style={{ textDecoration: "none", color: "#ffffff" }}>Logout</Link></button>
                                    </div>
                                </div>
                            </div>


                            <main className='feedContainer'>
                                <div className="header" style={{ display: "flex", justifyContent: "space-between", margin: "0.2rem 2rem" }}>
                                    <h3 style={{ color: "orangered" }}>Your Posts</h3>
                                    <button onClick={() => setShowPostsForm(!showPostsForm)} style={{ backgroundColor: "#19a4f4", border: "none", padding: "0.35rem 1rem", color: "#ffffff", cursor: "pointer" }}>Create Post</button>
                                </div>
                                {
                                    userDatas.posts.length === 0 ? (<h4
                                        style={{ position: "absolute", top: "50vh", left: "50%" }}>
                                        You haven't created post yet 😒
                                    </h4>) : (
                                        <div className="postsContainer">
                                            {
                                                userDatas.posts.map((post) => {
                                                    return (
                                                        <div className="post">
                                                            {/* Check If image is present or not while db data fetching */}
                                                            {
                                                                post.postImage ? (
                                                                    <div className="image">
                                                                        <img src={`http://localhost:8000/postsImages/${post.postImage}`} alt="postImg" />
                                                                    </div>
                                                                ) : null
                                                            }
                                                            <div className='postDescription'>
                                                                <p className='postAbout'>{post.postContent}</p>
                                                                <div className="postUtils">
                                                                    <div className="buttonGroup" style={{ display: "flex", alignItems: "center" }}>
                                                                        <button onClick={() => updateLike(post._id)}><span style={{ fontSize: "0.9rem" }}>({post.postlikes.length})</span><AiFillLike /></button>
                                                                        <button><FaShareAlt /></button>
                                                                        <button onClick={() => {
                                                                            setUpdatePostData({ ...updatePostData, postContent: post.postContent, postId: post._id })
                                                                            setShowPostsForm(!showPostsForm)
                                                                        }}><FaEdit style={{ color: "blue" }} /></button>
                                                                        <button><RiDeleteBin6Fill style={{ color: "red" }} /></button>
                                                                    </div>
                                                                    <div className="addComment">
                                                                        <input
                                                                            type="text"
                                                                            name="comment"
                                                                            placeholder='Comment...'
                                                                            value={commentData.comment}
                                                                            onChange={collectComment}
                                                                        />
                                                                        <button onClick={() => handleComment(post._id)}>Comment</button>
                                                                    </div>
                                                                </div>
                                                                <div className="comments">
                                                                    {
                                                                        post.postComments.length !== 0 ? (
                                                                            <ul>
                                                                                {
                                                                                    post.postComments.map(postComment => {
                                                                                        return (
                                                                                            <li key={postComment._id}><span style={{ fontWeight: "bold" }}>{postComment.username}:</span> {postComment.comment}</li>
                                                                                        )
                                                                                    })
                                                                                }
                                                                                {/* <li><span style={{ fontWeight: "bold" }}>Username1:</span><br /> Comment1 Goes Here</li>
                                                                                <li><span style={{ fontWeight: "bold" }}>Username2:</span><br /> Comment2 Goes Here</li> */}
                                                                            </ul>
                                                                        ) : null
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                }
                            </main>
                        </div>
                        {
                            showPostsForm ? (<div className='createOrUpdatePost'>
                                <div className="postCreationForm">
                                    <button className='closeForm' onClick={() => { setUpdatePostData({ ...updatePostData, postContent: "" }); setShowPostsForm(!showPostsForm) }}><ImCross /></button>
                                    <div className="postForm">
                                        <form className='createPostForm' method='post' onSubmit={updatePostData.postContent ? handlePostUpdation : handlePostCreation} encType='multipart/form-data'>
                                            <textarea
                                                name="postDescription"
                                                value={updatePostData.postContent ? updatePostData.postContent : createPostData.postDescription}
                                                onChange={updatePostData.postContent ? collectUpdateFormaData : collectFormData}
                                                rows="10"
                                                placeholder='Drop Your Imagination...'
                                                required
                                            />
                                            <label htmlFor="AddImage">{updatePostData.postContent ? "Update Image" : "Add Image"}</label>
                                            <input
                                                type="file"
                                                name='image'
                                                accept=".png, .jpg, .jpeg"
                                                onChange={updatePostData.postContent ? handleUpdationImage : handleImage}
                                            />
                                            <input type="submit" value="Upload" />
                                        </form>
                                    </div>
                                </div>
                            </div>) : null
                        }
                    </>
                )
            }
        </>
    )
}

export default ProfilePageCompo