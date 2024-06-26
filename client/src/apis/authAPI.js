import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api/auth"
})


/*
ROUTES: (all are Post type)
Creating User: /create
Login User: /login
Forgot Pass: /forgotPassword
*/
export const createUser = async (data) => {
    try {
        const response = await axiosInstance.post("/create", data);
        return response.data; // Return the response data if needed
    } catch (error) {
        console.error("Error creating user:", error);
        // throw error; // Re-throw the error to handle it in the component
    }
}

export const loginUser = async (data) => {
    try {
        const response = await axiosInstance.post("/login", data);
        return response.data; // Return the response data if needed
    } catch (error) {
        console.error("Error creating user:", error);
    }
}


// api for sending mail
export const forgotPasswordAPI = async(data) => {
    try {
        const response = await axiosInstance.post("/forgotPassword", data);
        return response.data;
    } catch (error) {
        console.error(error)
    }   
}

// API  for changing password
export const recoverPassword = async(data) => {
    try {
        const response = await axiosInstance.post("/recoverPassword", data);
        return response.data;
    } catch (error) {
        console.error(error)
    }
}