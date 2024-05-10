import React, { useState } from 'react'

import "../Css/adminlogin.css";
import { loginUser } from '../services/AuthServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AdminLogin = () => {

  const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
            loginUser(playload).then((res) => {
                if (res && res == true) {

                    toast.success('Login Successful!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        // transition: Bounce,
                    });

                    window.location.href = '/';
                    setUsername('');
                    setPassword('');


                } else {
                    toast.error('Login Failed!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        // transition: Bounce,
                    });

                }
            }).catch((err) => {
                console.log(err);
                toast.error('Login Failed!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    // transition: Bounce,
                });
            });
        }
    }


      


  
    return (
      <div>
      <div className="login-page">
       
        <div className="form">
        <h1>Admin Login</h1>
        <br></br>
          <form className="register-form">
            <input type="text" placeholder="name" />
            <input type="password" placeholder="password" />
            <input type="text" placeholder="email address" />
            <button>create</button>
            <p className="message">Already registered? <a href="#">Sign In</a></p>
          </form>
          <form className="login-form">
            <input type="text" placeholder="username" />
            <input type="password" placeholder="password" />
          
            <button>login</button>
            <p className="message">Not registered? <a href="#">Create an account</a></p>
          </form>
        </div>
      </div>


      </div>
    )
  
}

export default AdminLogin; 

