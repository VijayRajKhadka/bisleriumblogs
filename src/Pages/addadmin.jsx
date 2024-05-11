import { useState } from "react";
import "../Css/addadmin.css";
import Sidebar from "./AdminSidebar";

import axios from "axios";
import Cookies from "js-cookie";

const Addadmin = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    userName: "",
    password: "",
    retypePassword: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const adminToken = Cookies.get("adminToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`
      };
      const response = await axios.post(
        "https://localhost:7216/api/admin/addAdminUser",
        formData,
        { headers }
      );
      console.log("User registered successfully:", response.data);
      // Optionally, you can reset the form after successful registration
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        bio: "",
        userName: "",
        password: "",
        retypePassword: ""
      });
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div>
      <div className="grid-container">
        <Sidebar />
        <main className="main-container">
          <div className="wrapper">
            <div className="login-box">
              <h3 className="info-text">User Registration</h3>
              <form className="form-container" onSubmit={handleSubmit}>
                <div className="input-addon">
                  <input
                    className="form-element input-field"
                    placeholder="First Name"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="input-addon">
                  <input
                    className="form-element input-field"
                    placeholder="Last Name"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="input-addon">
                  <input
                    className="form-element input-field"
                    placeholder="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="input-addon">
                  <textarea
                    className="form-element input-field"
                    placeholder="Bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input-addon">
                  <input
                    className="form-element input-field"
                    placeholder="Username"
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="input-addon">
                  <input
                    className="form-element input-field"
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="input-addon">
                  <input
                    className="form-element input-field"
                    placeholder="Re-type password"
                    type="password"
                    name="retypePassword"
                    value={formData.retypePassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <br></br><br></br>
                <button type="submit" className="button">Submit</button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Addadmin;
