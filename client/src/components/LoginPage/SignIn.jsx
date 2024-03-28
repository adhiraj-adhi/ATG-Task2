import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../apis/authAPI';

const SignIn = ({ showLoginForm, formToggler }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const collectData = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await loginUser(formData);
        console.log(response.message);
        if(response.message){
            // navigate(`/profile/${response.message.id}`)
            navigate('/home', { state: { data: response.message } })
        }
    }

    return (
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
                <Link to={""} style={{ color: "red", fontSize: "0.95rem" }}>Forgot Password</Link>
            </div>
        </div>
    )
}

export default SignIn