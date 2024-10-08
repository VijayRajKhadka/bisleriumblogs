import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

import "../Css/adminlist.css";

import Sidebar from "./AdminSidebar";

const Admin = () => {
  const [adminUsers, setAdminUsers] = useState([]);

  useEffect(() => {
    const adminToken = Cookies.get("adminToken");

    fetch("https://localhost:7216/api/admin/getAllAdminUser", {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setAdminUsers(data))
      .catch((error) => console.error("Error fetching admin users:", error));
  }, []);

  return (
    <div>
      <div className="grid-container">
        <Sidebar />

        <main className="main-container">
          <button className="admin-add" style={{ backgroundColor: "green" }}>
            <a href="/Addadmin" target="_blank">
              <span className="material-icons-outlined">inventory_2</span> Add
              Admin
            </a>
          </button>

          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email Address</th>
                <th>Bio</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {adminUsers.map((user) => (
                <tr key={user.userId}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.bio}</td>
                  <td>
                    <button className="delete">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
};

export default Admin;
