import React, { Component } from 'react';
import axios from 'axios';
import "../Css/adminlogin.css";

export default class LoginAndRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {},
      showErrorPopUp: false // State to control the visibility of the error pop-up
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    let errors = {};

    // Username validation
    if (!username.trim()) {
      errors.username = 'Username is required';
    }

    // Password validation
    if (!password.trim()) {
      errors.password = 'Password is required';
    }

    if (Object.keys(errors).length === 0) {
      // If there are no errors, you can submit the form
      console.log('Form submitted successfully');
      // You can add your login logic here, like calling an API
      // For demonstration, let's assume login failed
      this.setState({ showErrorPopUp: true }); // Show the error pop-up
      setTimeout(() => {
        this.setState({ showErrorPopUp: false }); // Hide the error pop-up after 5 seconds
      }, 5000);
    } else {
      // If there are errors, update the state to display them
      this.setState({ errors });
    }
  };

  render() {
    const { username, password, errors } = this.state;
    const { showErrorPopUp } = this.state; // Destructure showErrorPopUp from state

    return (
      <div>
        <div className="login-page">
          <div className="form">
            <h1>Admin Login</h1>
            <br />
            <form className="login-form" onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={this.handleChange}
              />
              {errors.username && <span className="error">{errors.username}</span>}
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={this.handleChange}
              />
              {errors.password && <span className="error">{errors.password}</span>}
              <button type="submit">Login</button>
              <p className="message">Not registered? <a href="#">Create an account</a></p>
            </form>
            {showErrorPopUp && (
              <div className="error-pop-up">
                <p>Admin credentials are wrong</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
