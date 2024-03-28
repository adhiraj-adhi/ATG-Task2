import React, { useState } from 'react'
import { createUser } from '../../apis/authAPI';
import { useNavigate } from 'react-router-dom';

const SignUp = ({ showLoginForm, formToggler }) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        confPassword: "",
        city: "",
        profilePic: "",
        relationship: "Single",
        about: ""
    })

    function collectData(e) {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }
    function handleImage(e) {
        setUserData({ ...userData, profilePic: e.target.files[0] });
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', userData.username);
        formData.append('email', userData.email);
        formData.append('password', userData.password);
        formData.append('confPassword', userData.confPassword);
        formData.append('city', userData.city);
        formData.append('profilePic', userData.profilePic);
        formData.append('relationship', userData.relationship);
        formData.append('about', userData.about);
        console.log("image: ",userData.profilePic);

        try {
            const response = await createUser(formData);
            if(response.message){
                // navigate(`/profile/${response.message.id}`)
                navigate('/home', { state: { data: response.message } })
            }
        } catch (error) {
            console.error("Error creating user:", error);
        }
    }
    return (
        <div className='signUpForm'>
            <h3>Register Here..</h3>
            <form method='post' onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="formFields">
                    <div className="fields">
                        <div className="field">
                            <label htmlFor="Username">Username</label><br />
                            <input
                                type="text"
                                name='username'
                                value={userData.username}
                                onChange={collectData}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="Password">Password</label><br />
                            <input
                                type="Password"
                                name="password"
                                value={userData.password}
                                onChange={collectData}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="City">City</label><br />
                            <input
                                type="text"
                                name="city"
                                value={userData.city}
                                onChange={collectData}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="Relation">Relationship</label><br />
                            <select name='relationship' onChange={collectData}>
                                <option value={userData.relationship}>Single</option>
                                <option>Married</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>
                    <div className="fields">
                        <div className="field">
                            <label htmlFor="Email">Email</label><br />
                            <input
                                type="email"
                                name="email"
                                value={userData.email}
                                onChange={collectData}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="Password">Confirm Password</label><br />
                            <input
                                type="Password"
                                name="confPassword"
                                value={userData.confPassword}
                                onChange={collectData}
                            />
                        </div>
                        <div className='field'>
                            <label htmlFor="Profile Pic"> Profile Picture </label>
                            <input
                                type="file"
                                name='profilePic'
                                accept=".png, .jpg, .jpeg"
                                onChange={handleImage}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="About">About</label><br />
                            <textarea
                                style={{ resize: "none" }}
                                rows="2"
                                name='about'
                                value={userData.about}
                                onChange={collectData}
                            />
                        </div>
                    </div>
                </div>

                <input type="submit" value="Register" />
            </form>
            <button onClick={() => formToggler(!showLoginForm)}>Already Registered? Click to login</button>
        </div>
    )
}

export default SignUp