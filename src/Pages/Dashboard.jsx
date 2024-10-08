import React, { Component } from "react";

import "../Css/ad.css";
import Sidebar from "./Sidebar";

import { chart as charts } from "chart.js/auto";

import { Line } from 'react-chartjs-2';

import { Bar, Doughnut, line } from "react-chartjs-2";

import sourceData from "./data/sourceData.json";

import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip
} from 'chart.js';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip
)

export default class Dashboard extends Component {
  render() {
    const data = {
        labels: ['mon','tue','wed'],
        datasets: [{
            label: 'Sales of the Week',
            data: [6,3,9],
            backgroundColor: 'aqua',
            borderColor: 'black',
            pointBorderColor: 'aqua',
            fill: true,
            tension: 0.4
        }]
    }

    const options = {
        plugins: {
            legend: true
        },
        scales: {
            y: {

            }
        }
    }

    return (
      <div>
        <div className="grid-container">
            <Sidebar />
          {/* End Sidebar */}
          {/* Main */}
          <main className="main-container">
            <div className="main-title">
              <h2>DASHBOARD</h2>
            </div>
            <div className="main-cards">
              <div className="card">
                <div className="card-inner">
                  <h3>PRODUCTS</h3>
                  <span className="material-icons-outlined">inventory_2</span>
                </div>
                <h1>249</h1>
              </div>
              <div className="card">
                <div className="card-inner">
                  <h3>CATEGORIES</h3>
                  <span className="material-icons-outlined">category</span>
                </div>
                <h1>25</h1>
              </div>
              <div className="card">
                <div className="card-inner">
                  <h3>CUSTOMERS</h3>
                  <span className="material-icons-outlined">groups</span>
                </div>
                <h1>1500</h1>
              </div>
              <div className="card">
                <div className="card-inner">
                  <h3>ALERTS</h3>
                  <span className="material-icons-outlined">
                    notification_important
                  </span>
                </div>
                <h1>56</h1>
              </div>
            </div>
            <div className="charts">
            <div className="charts-card">
                <h2 className="chart-title">Top 5 Products</h2>
                <div className="dataCard customerCard">
                  <Line
                    data = {data}
                    options = {options}
                  />
                </div>
              </div>
              <div className="charts-card">
                <h2 className="chart-title">Top 5 Products</h2>
                <div className="dataCard customerCard">
                  <Bar
                    data={{
                      labels: sourceData.map((data) => data.label),
                      datasets: [
                        {
                          label: "Count",
                          data: sourceData.map((data) => data.value),
                          backgroundColor: [
                            "rgba(43, 63, 229, 0.8)",
                            "rgba(250, 192, 19, 0.8)",
                            "rgba(253, 135, 135, 0.8)",
                          ],
                          borderRadius: 5,
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        title: {
                          text: "Revenue Source",
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <div className="charts-card">
                <h2 className="chart-title">Top 5 Products</h2>
                <div className="dataCard customerCard">
                  <Bar
                    data={{
                      labels: sourceData.map((data) => data.label),
                      datasets: [
                        {
                          label: "Count",
                          data: sourceData.map((data) => data.value),
                          backgroundColor: [
                            "rgba(43, 63, 229, 0.8)",
                            "rgba(250, 192, 19, 0.8)",
                            "rgba(253, 135, 135, 0.8)",
                          ],
                          borderRadius: 5,
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        title: {
                          text: "Revenue Source",
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <div className="charts-card">
                <h2 className="chart-title">Purchase and Sales Orders</h2>
                <Doughnut
                data={{
                    labels: sourceData.map((data) => data.label),
                    datasets: [
                        {
                            label: "Count",
                            data: sourceData.map((data) => data.value),
                            backgroundColor: [
                                "rgba(43, 63, 229, 0.8)",
                                "rgba(250, 192, 19, 0.8)",
                                "rgba(253, 135, 135, 0.8)",
                            ],
                            borderRadius: 5,
                        },
                    ],
                }}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Revenue Source",
                        },
                    },
                    aspectRatio: 1, // Adjust aspect ratio to make it circular
                    responsive: true, // Make it responsive
                }}
            />

              </div>

              



            </div>
          </main>
          {/* End Main */}
        </div>
      </div>
    );
  }
}
