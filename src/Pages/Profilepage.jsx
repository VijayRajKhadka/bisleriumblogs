import React, { Component, useEffect, useState } from "react";
import "../Css/profile.css";
import NavBar from "../Components/NavBar";
import SideBar from "../Components/SideBar";
import { getUserDetails, updateUserDetails } from "../services/UserServices";
import { get } from "firebase/database";
import { getLocalStorageItem, setLocalStorageItem } from "../services/LocalStorageService";
import { Toast } from "bootstrap";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { deleteUser } from "../services/AuthServices";

const ProfilePage = () => {
  const [user, setUser] = useState(null);


  //update profile state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");


  //channge password state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


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
              <h1 className="profile-name">{user?.firstName || "No username available"} {user?.lastName || "No username available"}</h1>
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
                <a className="profile-button"  style={{ color: " red" }}>
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
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="last-name">Last Name</label>
                      <input
                        type="text"
                        id="last-name"
                        name="last-name"
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="bio">Bio</label>
                      <textarea id="bio" name="bio"
                        onChange={(e) => setBio(e.target.value)}
                      />
                    </div>
                    <input type="file" id="image" name="image" accept="image/*" className="form-input w-full text-white rounded-md border border-white bg-transparent" onChange={(e) => (e.target.files[0])} />

                    <center>
                      <button type="submit" className="btn " onClick={() => {
                        if (firstName.length > 0 && lastName.length > 0 && bio.length > 0) {
                          var payload = {
                            userId: user.userId,
                            firstName: firstName,
                            lastName: lastName,
                            bio: bio,
                            password: getLocalStorageItem("password"),
                          }
                          updateUserDetails(payload).then(
                            (res) => {
                              console.log(res);
                              getUserDetails().then(
                                (res) => {
                                  console.log("🚀 ~ useEffect ~ res:", res)

                                  setUser(res);
                                }
                              )
                            }
                          )

                        }
                      }}>
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
                        onChange={(e) => setOldPassword(e.target.value)}
                        name="new-password"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="new-password">New Password</label>
                      <input
                        type="password"
                        id="new-password"
                        onChange={(e) => setNewPassword(e.target.value)}
                        name="new-password"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirm-password">Confirm Password</label>
                      <input
                        type="password"
                        id="confirm-password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        name="confirm-password"
                        required
                      />
                    </div>
                    <center><button type="submit" className="btn"
                      onClick={() => {
                        console.log(oldPassword);
                        console.log(newPassword);
                        console.log(getLocalStorageItem("password"));
                        if (oldPassword.length > 0 && newPassword.length > 0 && confirmPassword.length > 0) {
                          if (oldPassword === getLocalStorageItem("password").replace(/['"]+/g, '')) {

                            if (newPassword === confirmPassword) {
                              var payload = {
                                userId: user.userId,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                bio: user.bio,
                                password: newPassword,
                              }
                              updateUserDetails(payload).then(
                                (res) => {
                                  console.log(res);
                                  getUserDetails().then(
                                    (res) => {
                                      console.log("🚀 ~ useEffect ~ res:", res)

                                      setUser(res);
                                      setLocalStorageItem("password", newPassword);
                                      toast.success('Password changed successfully', {
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
                                  )
                                }
                              )

                            } else {
                              toast.error('Password does not match', {
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
                          } else {
                            toast.error('Old password does not match', {
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


                        } else {
                          toast.error('All fields are required', {
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
                      }}
                    >
                      Change Password
                    </button>
                    </center>
                  </div>
                </div>
              </div>
            </div>
            <ToastContainer />

          </div>
        </div>
      </div>
    );
  }
}
export default ProfilePage;
