import React, { Component, useEffect, useState } from "react";
import "../Css/profile.css";
import NavBar from "../Components/NavBar";
import SideBar from "../Components/SideBar";
import { getUserDetails } from "../services/UserServices";
import { deleteUser } from '../services/AuthServices';

const ProfilePage = () =>{
  const [user, setUser]= useState(null);

  useEffect(() => {
    getUserDetails().then(
      (res) => {
        console.log("🚀 ~ useEffect ~ res:", res)
  
        setUser(res);
      }
    )
}, []);

   {
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

              <h1 className="profile-name">{user?.userName || "No username available"}</h1>
              <p className="profile-bio">{user?.email || "No email available"}</p>
              <p className="profile-bio">{user?.bio || "No bio available"}</p>


            </div>

            <br></br>
            <center>
              <div className="profile-button">
                <a className="profile-button" href="#popup1">
                  Update Profile
                </a>
              </div>
              <br />
              <hr style={{ width: "90%" }} />
              <br />
              <div className="profile-button">
                <a className="profile-button" href="#popup2">
                  Change Password
                </a>
              </div>

              <br />
              <hr style={{ width: "90%" }} />
              <br />

              <div className="profile-button">
                <a className="profile-button" onClick={deleteUser} style={{ color: " red" }}>
                  Delete Account
                </a>
              </div>
              <br />
              <hr style={{ width: "90%" }} />

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
                    <input type="file" id="image" name="image"  accept="image/*" className="form-input w-full text-white rounded-md border border-white bg-transparent" onChange={(e) => (e.target.files[0])} />

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

            
          </div>
        </div>
      </div>
    );
  }
}
export default ProfilePage;
