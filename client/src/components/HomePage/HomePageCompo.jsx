import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import "./styles.css"
import { IoLocationSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { FaShareAlt } from "react-icons/fa";
import { getAllPosts, updateLikeAPI, userComment } from '../../apis/postsAPI';

const HomePageCompo = () => {
    const location = useLocation();
    const data = location.state.data;
    console.log(data);

    const [isLoading, setIsLoading] = useState(true);
    const [allPosts, setAllPosts] = useState(null);

    // fetching all posts
    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                const response = await getAllPosts();
                setAllPosts(response.data.message);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
                // Set loading to false whether data is fetched successfully or not
            }
        };

        fetchAllPosts();
    }, []);

    // function to update like:
    const updateLike = async (postId) => {
        const ids = {
            userId: data.id,
            postId: postId
        }

        try {
            console.log(postId);
            const response = await updateLikeAPI(ids);
            if (response.data.message) {
                const index = allPosts.findIndex(post => post._id === postId);
                if (index !== -1) {
                    const updatedPosts = [...allPosts];
                    updatedPosts[index].postlikes = response.data.likes;
                    setAllPosts(updatedPosts);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    // handling comment feature:
    const [commentData, setCommentData] = useState({ comment: "", postId: "", userId: "" });

    const collectComment = (e) => {
        setCommentData({ ...commentData, comment: e.target.value });
    }

    const handleComment = async (postId) => {
        const newComment = { ...commentData, postId: postId, userId: data.id };
        try {
            const response = await userComment(newComment);
            if (response.data.message) {
                const index = allPosts.findIndex(post => post._id === postId);
                if (index !== -1) {
                    const updatedPosts = [...allPosts];
                    updatedPosts[index].postComments = response.data.comments;
                    setAllPosts(updatedPosts);
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
                    <div className='homePageContainer'>
                        <div className='userDetails'>
                            <div className="profilePic">
                                {/* <img src="https://www.theloadout.com/wp-content/uploads/2021/02/ps5-vr-announcement.jpg" alt="profileImg" /> */}
                                <img src={`http://localhost:8000/profilePictures/${data.profilePicture}`} alt="profileImg" />
                            </div>
                            <div className="userInfo">
                                <h3 className='username'>{data.username}</h3>
                                <p className='about'>{data.about}</p>
                                <ul>
                                    <li><IoLocationSharp style={{ fontSize: "0.9rem", color: "blue" }} /> {data.city}</li>
                                    <li><FaHeart style={{ fontSize: "0.8rem", color: "red" }} /> {data.relationship}</li>
                                </ul>

                                <div className='profileDirector'>
                                    <button><Link to={`/profile/${data.id}`} style={{ textDecoration: "none", color: "#ffffff" }}>Go to profile</Link></button>
                                    <button><Link to={"/login"} style={{ textDecoration: "none", color: "#ffffff" }}>Logout</Link></button>
                                </div>
                            </div>
                        </div>

                        {
                            allPosts.length === 0 ? (<h4
                                style={{ position: "absolute", top: "50vh", left: "50%" }}>
                                No any posts yet 😒
                            </h4>) : (
                                <main className='feedContainer'>
                                    <div className="postsContainer">
                                        {
                                            allPosts.map((post) => {
                                                return (
                                                    <div key={post.id} className="post">
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
                                </main>
                            )
                        }
                    </div>
                )
            }
        </>
    )
}

export default HomePageCompo