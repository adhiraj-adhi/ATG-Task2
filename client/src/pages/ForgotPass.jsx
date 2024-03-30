import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import {recoverPassword} from "../apis/authAPI";

const ForgotPass = () => {
    const [responseMessage, setResponseMessage] = useState("");
    const [formData, setFormData] = useState({password: "", confPassword: ""}); 
    const {token}=useParams();

    const collectFormData = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const data = {token: token, formData}
        try {
            const response = await recoverPassword(data);
            setResponseMessage(response.message);
            console.log("ResSSS", response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="forgotPassContainer">
            <div className='forgotPassword'>
                <form method='post' onSubmit={handleSubmit}>
                    <h4 style={responseMessage === "Updation Success" ? { color: "green" } : { color: "red" }}> {responseMessage} </h4>
                    <input type="password" name='password' value={formData.password} onChange={collectFormData} placeholder='Enter New Password' /><br />
                    <input type="password" name='confPassword' value={formData.confPassword} onChange={collectFormData} placeholder='Confirm New Password' /><br/>
                    <input type="submit" value="Change Password" />
                </form>
            </div>
        </div>
    )
}

export default ForgotPass