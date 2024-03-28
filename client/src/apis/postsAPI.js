/*  ROUTES:
    Get All Posts: / -> Get type
    Get A User's data: "/userData" -> Get
    Create a Post: /create -> Post type
    Update a Post: /update -> Patch type
    Delete a Post: /delete -> Delete type
    Like a Post: /like -> Post type
    Comment on post: /comment -> Post
*/
import axios from "axios"
const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api/posts"
})


export const getAllPosts = async () => {
    try {
        const response = await axiosInstance.get("/");
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getUserData = async (id) => {
    try {
        const response = await axiosInstance.get("/userData", { params: { id } });
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const createPost = async (data) => {
    try {
        const response = await axiosInstance.post("/create", data);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = async (data) => {
    try {
        console.log("DDDAAAATTTAAA", data);
        const response = await axiosInstance.patch("/update", data);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = async (post_id) => {
    try {
        const response = await axiosInstance.delete("/delete", post_id);
        return response;
    } catch (error) {
        console.log(error);
    }
}

// upadte like api call:
export const updateLikeAPI = async (data) => {
    try {
        const response = await axiosInstance.post("/like", data);
        return response;
    } catch (error) {
        console.log(error);
    }
}