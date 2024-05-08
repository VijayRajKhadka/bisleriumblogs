import React, { useState } from 'react';
import '../Css/login.css';
import { loginUser } from '../services/AuthServices';
import NavBar from '../Components/NavBar';
import SideBar from '../Components/SideBar';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //error text
    const [usernameError, setUsernameError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    //validation
    const validateUsername = (username) => {
        if (username === '') {
            setUsernameError('Username is required');
        } else {
            setUsernameError(null);
        }
    };


    const validatePassword = (password) => {
        if (password === '' || password === null || password.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
        } else {
            setPasswordError(null);
        }
    };

    const handleLogin = () => {
        if (usernameError === null && passwordError === null) {
            const playload = {
                username: username,
                password: password
            }
            console.log("🚀 ~ handleLogin ~ playload:", playload)
            loginUser(playload)
        }
    }



    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <NavBar />
            <SideBar />
            <div className='login-page-container'>
                <div className='login-container'>
                    <div className="input-container">
                        <input className="input-field" type="text" onChange={(e) => {
                            setUsername(e.target.value);
                            validateUsername(e.target.value);
                        }} />
                        <label htmlFor="input-field" className="input-label" >Username</label>
                        {
                            usernameError ? <span className="text-red-600">**{usernameError}</span> : null
                        }

                        <span className="input-highlight"></span>
                    </div>

                    <div className="input-container">
                        <input
                            style={{
                                width: '85%',
                            }}
                            id="passwordInput"
                            className="input-field"
                            onChange={(e) => {
                                setPassword(e.target.value);
                                validatePassword(e.target.value);
                            }}
                            type={showPassword ? 'text' : 'password'}
                        />
                        <label htmlFor="passwordInput" className="input-label">Password</label>
                        {
                            passwordError ? <span className="text-red-600">**{passwordError}</span> : null
                        }
                        <span className="input-highlight" ></span>
                        <button
                            className="toggle-password-btn"
                            onClick={togglePasswordVisibility}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-eye-slash" viewBox="0 0 16 16">
                                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                                    <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-eye" viewBox="0 0 16 16">
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                </svg>
                            )}
                        </button>

                    </div>

                    <br />
                    <button onClick={handleLogin}>
                        <span className="circle1"></span>
                        <span className="circle2"></span>
                        <span className="circle3"></span>
                        <span className="circle4"></span>
                        <span className="circle5"></span>
                        <span className="text">LOGIN</span>
                    </button>
                    <br />
                    <br />
                    <div className='no-account'>
                        <p>Don't Have Account yet? <a href="/register" className="menu__link">Register!</a> </p>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Login;
