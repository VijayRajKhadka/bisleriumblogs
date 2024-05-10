import React, { Component } from 'react'


import "../Css/adminlist.css";

import Sidebar from "./AdminSidebar";


export default class Admins extends Component {
  render() {
    return (
        <div>
        <div className="grid-container">
        <Sidebar/>

        <main className="main-container">
          <button className='admin-add'>Add Admin</button>
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
}
