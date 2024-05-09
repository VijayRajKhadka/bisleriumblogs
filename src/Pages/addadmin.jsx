import React, { Component } from "react";

import "../Css/addadmin.css";
import Sidebar from "./AdminSidebar";

export default class addadmin extends Component {
  render() {
    return (
      <div>
        <div className="grid-container">
          <Sidebar />
          <main className="main-container"> 
                <div className="wrapper">
                <div className="login-box">
                    <h3 className="info-text">User Registration</h3>
                    <form className="form-container" action>
                    <div className="input-addon">
                        <input
                        className="form-element input-field"
                        placeholder="Name"
                        type="text"
                        />
                        {/* <button className="input-addon-item">
                        <span className="fa fa-user" />
                        </button> */}
                    </div>
                    <div className="input-addon">
                        <input
                        className="form-element input-field"
                        placeholder="Email"
                        type="email"
                        />
                        {/* <button className="input-addon-item">
                        <span className="fa fa-envelope" />
                        </button> */}
                    </div>
                    <div className="input-addon">
                        <textarea
                        className="form-element input-field"
                        placeholder="Bio"
                        type="Bio"
                        height="121"
                        />
                        {/* <button className="input-addon-item">
                        <span className="fa fa-envelope" />
                        </button> */}
                    </div>
                    <div className="input-addon">
                        <input
                        className="form-element input-field"
                        placeholder="Password"
                        type="password"
                        />
                        {/* <button className="input-addon-item">
                        <span className="fa fa-lock" />
                        </button> */}
                    </div>
                    <div className="input-addon">
                        <input
                        className="form-element input-field"
                        placeholder="Re-type password"
                        type="password"
                        />
                            {/* <button className="input-addon-item">
                            <span className="fa fa-lock" />
                            </button> */}
                    </div>
                    <input
                        className="form-element is-submit"
                        type="submit"
                        defaultValue="Create User"
                    />
                    </form>
                  
                </div>
                </div>
          </main>   
        </div>
      </div>
    );
  }
}
