import React, { Component } from 'react'
import Cookies from 'js-cookie';

const handleLogout = () => {
  Cookies.remove('adminToken'); // Clear the 'token' cookie
  window.location.href = '/loginadmin'; // Redirect to the home page or any desired location
}


export default class Sidebar extends Component {


  render() {
    return (
      <>
        {/* Header */}
        <header className="header">
         
         <div className="header-left">
           <span className="material-icons-outlined">search</span>
         </div>
         <div className="header-right">
           
          <a href="#" style={{ color: "red" }} onClick={handleLogout} >Logout</a>
         </div>
       </header>
       {/* End Header */}
       {/* Sidebar */}
       <aside id="sidebar">
         <div className="sidebar-title">
           <div className="sidebar-brand">
             <span className="material-icons-outlined">book</span>{" "}
             Bislerium
           </div>
           
         </div>
         <ul className="sidebar-list">
           <li className="sidebar-list-item">
             <a href="/admindashboard" target="_blank">
               <span className="material-icons-outlined">dashboard</span>{" "}
               Dashboard
             </a>
           </li>
           <li className="sidebar-list-item">
             <a href="/Admin" target="_blank">
               <span className="material-icons-outlined">inventory_2</span>{" "}
               Add Admin
             </a>
           </li>
    
         </ul>
       </aside>
       {/* End Sidebar */}
      </>
    )
  }
}
