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
      <div className="content">
        <div className="profile-main-container">
        <div className="profile-header">
          <center>
          <img
            src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt="Profile Picture"
            className="profile-picture"
          />
          </center>
          <h1 className="profile-name">@username</h1>
          <p className="profile-bio">Shirish Jonchhen</p>
          <p className="profile-bio">This is my bio</p>

        </div>

        <br></br>
        <center>
          <div className="button">
            <a className="button" href="#popup1">
              Update Profile
            </a>
          </div>
          <br/>
          <hr style={{width:"90%"}}/>
          <br/>
          <div className="button">
            <a className="button" href="#popup2">
              Change Password
            </a>
          </div>
          <br />          
          <hr style={{width:"90%"}}/>
        </center>

        <div id="popup1" className="overlay">
          <div className="popup">
            <center>
              <h2>Update Profile</h2>
            </center>
            <a className="close" href="#">
              ×
            </a>
            <div className="content">
              <div class="password-container">
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
                    <label htmlFor="bio">Bio</label>
                    <textarea id="bio" name="bio" />
                  </div>
                  <center>
                    <button type="submit" className="btn ">
                      Save Changes
                    </button>
                  </center>
              </div>
            </div>
          </div>
        </div>

        <div id="popup2" className="overlay">
          <div className="popup">
            <center><h2>Change Password</h2></center>
            <a className="close" href="#">
              ×
            </a>
            <div className="password-content">
              <div className="password-container">
                <div className="form-group">
                    <label htmlFor="new-password">old Password</label>
                    <input
                      type="password"
                      id="new-password"
                      name="new-password"
                      required
                    />
                  </div>
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
  </div>
    );
  }
}
