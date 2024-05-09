import React, { Component } from "react";
import "../Css/profile.css";
import NavBar from "../Components/NavBar";
import SideBar from "../Components/SideBar";

export default class profilepage extends Component {

  
  render() {
    return (
  <div>
     <NavBar />
            <SideBar />
      
      <div className="profile-card">
        <div className="profile-header">
          <img
            src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt="Profile Picture"
            className="profile-picture"
          />
          <h1 className="profile-name">John Doe</h1>
          <p className="profile-bio">Frontend Developer</p>
        </div>

        <br></br>
        <center>
          <div className="button">
            <a className="button" href="#popup1">
              Update Profile
            </a>
          </div>
          <br />
          <br />
          <br />

          <div className="button">
            <a className="button" href="#popup2">
              Change Password
            </a>
          </div>
          <br />
          <br />
          <br />

          <div className="button">
            <a className="button" href="#popup3">
              sign out
            </a>
          </div>
        </center>

        <div id="popup1" className="overlay">
          <div className="popup">
            <center>
              <h2>Who Is Me?</h2>
            </center>
            <a className="close" href="#">
              ×
            </a>
            <div className="content">
              <div class="container">
                <h2>User Profile</h2>
                <form>
                  <div className="form-group">
                    <label htmlFor="first-name">First Name</label>
                    <input
                      type="text"
                      id="first-name"
                      name="first-name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="last-name">Last Name</label>
                    <input
                      type="text"
                      id="last-name"
                      name="last-name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="bio">Bio</label>
                    <textarea id="bio" name="bio" required defaultValue={""} />
                  </div>
                  <center>
                    <button type="submit" className="btn ">
                      Submit
                    </button>
                  </center>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div id="popup2" className="overlay">
          <div className="popup">
            <center><h2>I Forgot!</h2></center>
            <a className="close" href="#">
              ×
            </a>
            <div className="content">
              <div className="container">
                <h2>Password Change</h2>
                <form>
                  <div className="form-group">
                    <label htmlFor="new-password">New Password</label>
                    <input
                      type="password"
                      id="new-password"
                      name="new-password"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                      type="password"
                      id="confirm-password"
                      name="confirm-password"
                      required
                    />
                  </div>
                  <center><button type="submit" className="btn">
                    Change Password
                  </button>
                  </center>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div id="popup3" className="overlay">
          <div className="popup">
            <h2>Here i am</h2>
            <a className="close" href="#">
              ×
            </a>
            <div className="content">
              Thanksssss to pop me out of that button, but now i'm done so you
              can close this window.
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}
