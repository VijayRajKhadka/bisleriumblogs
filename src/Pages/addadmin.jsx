import { useState } from "react";
import "../Css/addadmin.css";
import Sidebar from "./AdminSidebar";

const Addadmin = () => {
  

  return (
    <div>
      <div className="grid-container">
        <Sidebar />
        <main className="main-container">
          <div className="wrapper">
            <div className="login-box">
              <h3 className="info-text">User Registration</h3>
              <form className="form-container" >
                <div className="input-addon">
                  <input
                    className="form-element input-field"
                    placeholder="Name"
                    type="text"
                  />
                </div>
                <div className="input-addon">
                  <input
                    className="form-element input-field"
                    placeholder="Email"
                    type="email"
                  />
                </div>
                <div className="input-addon">
                  <textarea
                    className="form-element input-field"
                    placeholder="Bio"
                    type="Bio"
                    height="121"
                  />
                </div>
                <div className="input-addon">
                  <input
                    className="form-element input-field"
                    placeholder="Password"
                    type="password"
                  />
                </div>
                <div className="input-addon">
                  <input
                    className="form-element input-field"
                    placeholder="Re-type password"
                    type="password"
                  />
                </div>
                <br></br><br></br>
                <a class="button" href="#popup1">Submit</a>
              </form>
            </div>

            <div id="popup1" class="overlay">
                <div class="popup">
                  <h2>Here i am</h2>
                  <a class="close" href="#">&times;</a>
                  <div class="content" style={{ paddingRight:60 }}>
                    Thank to pop me out of that button, but now i'm done so you can close this window.
                  </div>
                </div>
              </div>
         
          </div>
        </main>
      </div>
    </div>
  );
};

export default Addadmin;
