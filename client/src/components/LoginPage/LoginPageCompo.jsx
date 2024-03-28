import React, { useState } from 'react'
import "./styles.css"
import SignIn from './SignIn'
import SignUp from './SignUp'

const LoginPageCompo = () => {
    const [showLoginForm, setShowLoginForm] = useState(true);
    return (
        <div className='formContainer'>
            {showLoginForm ? 
                <SignIn showLoginForm={showLoginForm} formToggler={setShowLoginForm} />  
                :<SignUp showLoginForm={showLoginForm} formToggler={setShowLoginForm} />}

        </div>
    )
}

export default LoginPageCompo