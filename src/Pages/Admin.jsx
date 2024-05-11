import React, { Component } from 'react'


import "../Css/adminlist.css";

import Sidebar from "./AdminSidebar";


const Addadmin = () => {
  
    return (
        <div>
        <div className="grid-container">
        <Sidebar/>

        <main className="main-container">
        <button className='admin-add' style={{ backgroundColor: 'green' }}>
          <a href="/Addadmin" target="_blank">
            <span className="material-icons-outlined">inventory_2</span>{" "}
            Add Admin
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
                <tr>
                <td data-column="First Name">James</td>
                <td data-column="Last Name">Matman</td>
                <td data-column="Job Title">Chief Sandwich Eater</td>
                <td data-column="Twitter">@james</td>
                <td data-column="Action"><button className='delete'>Delete</button></td>

                </tr>
                
            </tbody>
            </table>

          </main>

        

        
        </div>
        </div>
      
    )
  }
  
export default Addadmin;
