import React, { useState } from 'react';
import '../Css/login.css';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [firstName, setFirstName]=useState("");
    const [lastName, setLastName]=useState("");
    const [email, setEmail]=useState("");
    const [bio, setBio]=useState("");
    const [password, setPassword]=useState("");
    const [confirm_password, setConfirmPassword]=useState("");

    function registerUser(){

        const userData = {
            username: `${firstName}${lastName}`,
            email: email,
            password: password
        };
        
        console.log(userData);

        fetch('https://localhost:7216/api/authenticate/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Registration successful:', data);
        })
        .catch(error => {
            console.error('Error registering user:', error.message);
        });
    }
    

    return (
        <div className='login-page-container'>
            <div className='login-container'>
            <div style={{ display: 'flex', width:'450px'}}>
                <div className="input-container" >
                    <input className="input-field" type="text" placeholder='first name' value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
                    <label htmlFor="input-field" className="input-label" >First Name</label>
                    <span className="input-highlight"></span>
                </div>
                <div className="input-container">
                    <input className="input-field" type="text" placeholder='last name' value={lastName} onChange={(e)=>{setLastName(e.target.value)}} />
                    <label htmlFor="input-field" className="input-label" >Last Name</label>
                    <span className="input-highlight"></span>
                </div>
            </div>

                <div className="input-container" style={{width:'450px'}}>
                    <input className="input-field" type="text" placeholder='your email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    <label htmlFor="input-field" className="input-label" >Email</label>
                    <span className="input-highlight"></span>
                </div>

                <div className="input-container" style={{width:'450px'}}>
                    <input className="input-field" type="text" placeholder='write your bio in short' value={bio} onChange={(e)=>{setBio(e.target.value)}}/>
                    <label htmlFor="input-field" className="input-label" >Bio</label>
                    <span className="input-highlight"></span>
                </div>


                <div style={{ display: 'flex', width:'450px'}}>

                <div className="input-container">
                    <input
                        id="passwordInput"
                        className="input-field"
                        placeholder='6 character'
                        type={showPassword ? 'text' : 'password'}
                        value={password} onChange={(e)=>{setPassword(e.target.value)}}
                    />
                    <label htmlFor="passwordInput" className="input-label" >Password</label>
                    <span className="input-highlight"></span>

                </div>
                <div className="input-container">
                    <input
                        id="passwordInput"
                        className="input-field"
                        placeholder='match password'
                        type={showPassword ? 'text' : 'password'}
                        value={confirm_password} onChange={(e)=>{setConfirmPassword(e.target.value)}}
                    />
                    <label htmlFor="passwordInput" className="input-label">Confirm Password</label>
                    <span className="input-highlight"></span>
                    <button
                        className="toggle-password-btn"
                        onClick={togglePasswordVisibility}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-eye-slash" viewBox="0 0 16 16">
                                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
                                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
                                <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-eye" viewBox="0 0 16 16">
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                            </svg>
                        )}
                    </button>

                    </div>
                </div>
                <br />
                <button style={{width:"470px"}} onClick={registerUser}>
                    <span className="circle1"></span>
                    <span className="circle2"></span>
                    <span className="circle3"></span>
                    <span className="circle4"></span>
                    <span className="circle5"></span>
                    <span className="text">REGISTER</span>
                </button>
                <br />
                <br />
                <div className='no-account' style={{marginLeft:'140px'}}>
                    <p>Already Have Account? <a href="/login" className="menu__link">Login!</a> </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
