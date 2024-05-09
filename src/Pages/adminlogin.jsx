import React, { Component } from 'react'

import "../Css/adminlogin.css";

export default class loginandregister extends Component {
  render() {
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
}
