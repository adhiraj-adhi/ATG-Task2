import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import { forgotPasswordAPI, loginUser } from '../../apis/authAPI';

const SignIn = ({ showLoginForm, formToggler }) => {
    const navigate = useNavigate();
    const [showForgotPass, setShowForgotPass] = useState(false);
    const [showForgotPassResponse, setShowForgotPassResponse] = useState("");
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const collectData = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await loginUser(formData);
        console.log(response.message);
        if (response.message) {
            // navigate(`/profile/${response.message.id}`)
            navigate('/home', { state: { data: response.message } })
        }
    }


    // regarding fogot password:
    const [forgotPassData, setForgotPassData] = useState({email: ""});
    const collectForgotPassData = (e) => {
        setForgotPassData({... forgotPassData, email: e.target.value});
    } 

    const handleForgotPass = async(e) => {
        e.preventDefault();
        try {
            const response = await forgotPasswordAPI(forgotPassData);
            setShowForgotPassResponse(response.message);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className='signInForm'>
                <div className="form">
                    <h3>Login Here..</h3>
                    <form method='post' onSubmit={handleSubmit}>
                        <div className="fields">
                            <label htmlFor="username">Username</label><br />
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={collectData}
                            />
                        </div>
                        <div className="fields">
                            <label htmlFor="password">Password</label><br />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={collectData}
                            />
                        </div>
                        <input type="submit" value="Login" />
                    </form>
                </div>
                <div className="utils">
                    <button onClick={() => formToggler(!showLoginForm)}> New here? Click to register </button>
                    <button onClick={() => setShowForgotPass(!showForgotPass)} style={{ color: "red", fontSize: "0.95rem" }}>Forgot Password</button>
                </div>
            </div>

            {
                showForgotPass ? (
                    <div className="forgotPassContainer">
                        <div className='forgotPass'>
                            <form onSubmit={handleForgotPass}>
                                <h4 style={{color: "red"}}>{showForgotPassResponse}</h4>
                                <input type="email" name="email" value={forgotPassData.email} onChange={collectForgotPassData} placeholder='Enter registered mail' />
                                <input type="submit" value="Get Recovery Mail" />
                            </form>
                        </div>
                    </div>
                ) : null
            }
        </>
    )
}

export default SignIn