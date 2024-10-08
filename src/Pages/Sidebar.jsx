import React, { Component } from 'react'
import NotiCard from "./notification_card";


import "../Css/ad.css";


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
            <span className="material-icons-outlined">notifications</span>
            <div className="notification-box">
            <NotiCard/> 
            
            </div>
            <span className="material-icons-outlined">email</span>
            <span className="material-icons-outlined">account_circle</span>
        </div>
        </header>

       {/* End Header */}
       {/* Sidebar */}
       <aside id="sidebar">
         <div className="sidebar-title">
           <div className="sidebar-brand">
             <span className="material-icons-outlined">shopping_cart</span>{" "}
             STORE
           </div>
           
         </div>
         <ul className="sidebar-list">
           <li className="sidebar-list-item">
             <a href="#" target="_blank">
               <span className="material-icons-outlined">dashboard</span>{" "}
               Dashboard
             </a>
           </li>
           <li className="sidebar-list-item">
             <a href="#" target="_blank">
               <span className="material-icons-outlined">inventory_2</span>{" "}
               Add Admins
             </a>
           </li>

         </ul>
       </aside>
      </>
    )
  }
}
