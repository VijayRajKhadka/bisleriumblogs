import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import "../Css/adminlogin.css";
import { loginAdmin, loginAdmmin } from '../services/AuthServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Adminlogin = () => {
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
          loginAdmin(playload).then((res) => {
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

                  window.location.href = '/admindashboard';
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
            <br />
            <form className="login-form">
              <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={(e) => {
                  setUsername(e.target.value);
                  validateUsername(e.target.value);
                }}
              />
              
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePassword(e.target.value);
                }}
              />
              
              <button onClick={handleLogin}>Login</button>
              <p className="message">Not registered? <a href="#">Create an account</a></p>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    );
  }


export default Adminlogin;