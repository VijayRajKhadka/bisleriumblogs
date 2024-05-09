import React, { Component } from "react";

import "../Css/ad.css";

import { chart as charts } from "chart.js/auto";

import { Bar, Doughnut, line } from "react-chartjs-2";

import sourceData from "./data/sourceData.json";
import Sidebar from "./AdminSidebar";


export default class admindashboard extends Component {
  render() {


    return (
      <div>
        <div className="grid-container">
          <Sidebar/>
          
          {/* Main */}
          <main className="main-container">
            <div className="main-title">
             <h2 >DASHBOARD</h2>
            </div>
            <div className="main-cards">
              <div className="card">
                <div className="card-inner">
                  <h3>POSTS</h3>
                  <span className="material-icons-outlined">inventory_2</span>
                </div>
                <h1>249</h1>
              </div>
              <div className="card">
                <div className="card-inner">
                  <h3>UPVOTE</h3>
                  <span className="material-icons-outlined">category</span>
                </div>
                <h1>25</h1>
              </div>
              <div className="card">
                <div className="card-inner">
                  <h3>DOWNVOTE</h3>
                  <span className="material-icons-outlined">groups</span>
                </div>
                <h1>1500</h1>
              </div>
              <div className="card">
                <div className="card-inner">
                  <h3>DOWNVOTE</h3>
                  <span className="material-icons-outlined">groups</span>
                </div>
                <h1>1500</h1>
              </div>
              <div className="card">
                <div className="card-inner">
                  <h3>COMMENTS</h3>
                  <span className="material-icons-outlined">
                    notification_important
                  </span>
                </div>
                <h1>56</h1>
              </div>
              
            </div>

        
          </main>
          {/* End Main */}
        </div>
      </div>
    );
  }
}
