import { useEffect, useState } from "react";

import "../Css/ad.css";

import { chart as charts } from "chart.js/auto";

import { Line } from "react-chartjs-2";

import { Bar, Doughnut, line } from "react-chartjs-2";

import sourceData from "./data/sourceData.json";
import Sidebar from "./AdminSidebar";

import { getAllBlogs } from "../services/BlogServices";
import PostCard from "../Components/post_card";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

const Admindashboard = () => {

  const [blogs, setBlogs] = useState([])
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageSize = 10;
  const [moreData, setMoreData] = useState(true);


  useEffect(() => {
      const loadMoreData = async () => {
          try {
              setLoading(true);
              const newData = await getAllBlogs(page);
              if (Array.isArray(newData)
                  && newData.length > 0) {
                  var newArr = [...blogs, ...newData];
                  setBlogs(
                      newArr
                  );
                  var newPage = page + 1;
                  setPage(newPage);
              }
              else {
                  setMoreData(false);
              }
          }
          catch (error) {
              console.error('Error fetching data:', error);
              setMoreData(false);
          } finally {
              setLoading(false);
          }
      };

      if (moreData && !loading) {
          loadMoreData();
      }
  }, [page, pageSize, moreData, loading]);


  const handleScroll = () => {
      if (
          window.innerHeight +
          document.documentElement.scrollTop ===
          document.documentElement.offsetHeight
      ) {
          var newPage = page + 1;
          setPage(newPage);
      }
  };

  useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () =>
          window.removeEventListener('scroll', handleScroll);
  }, []);


  
    const data = {
      labels: ["mon", "tue", "wed"],
      datasets: [
        {
          label: "Sales of the Week",
          data: [6, 3, 9],
          backgroundColor: "aqua",
          borderColor: "black",
          pointBorderColor: "aqua",
          fill: true,
          tension: 0.4,
        },
      ],
    };

    const options = {
      plugins: {
        legend: true,
      },
      scales: {
        y: {},
      },
    };
    
 

    return (
      <div>
        <div className="grid-container">
          <Sidebar />

          {/* Main */}
          <main className="main-container">
            <div className="main-title">
              <h2>DASHBOARD</h2>
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
            <div className="charts">
              <div className="charts-card">
                <h2 className="chart-title">Top 5 Products</h2>
                <div className="dataCard customerCard">
                  <Line data={data} options={options} />
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
            <br></br>
            <center><h1 style={{ fontSize: '50px' }}>Top 10 Most Popular Blogs</h1><br></br></center>
           <center>
           {
              blogs && blogs.map((blog, index) => {
                  return (
                    <div key={blog.id} style={{ position: 'relative' }}>
                          <div style={{ position: 'absolute', top: '5%', left: 0, transform: 'translateY(-50%)',  padding: '5px' }}>
                              <span style={{ fontSize: '50px' }}> {index + 1}</span>
                          </div>

                          <PostCard
                              title={blog.title}
                              content={blog.content}
                              imageUrl={blog.images[0]}
                              postedBy={blog.user.userName}
                              postedOn={blog.postedOn}
                              score={blog.score}
                              comments={blog.comments}
                              id={blog.id}
                              likedByMe={blog.likedByMe}
                              savedByMe={blog.savedByMe}
                          />
                        
                      </div>
                  );
              })
          }

          {
              !loading && !moreData && (
                  <div>
                      No more data
                  </div>
              )
          }

            </center>


            
           

            <div className="tables">
              <div className="left-div">
              <table>
                <caption>Top 10 Blog Posts</caption>
                <thead>
                  <tr>
                    <th scope="col">Account</th>
                    <th scope="col">Due Date</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Period</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td data-label="Account">Visa - 3412</td>
                    <td data-label="Due Date">04/01/2016</td>
                    <td data-label="Amount">$1,190</td>
                    <td data-label="Period">03/01/2016 - 03/31/2016</td>
                  </tr>
                  <tr>
                    <td scope="row" data-label="Account">Visa - 6076</td>
                    <td data-label="Due Date">03/01/2016</td>
                    <td data-label="Amount">$2,443</td>
                    <td data-label="Period">02/01/2016 - 02/29/2016</td>
                  </tr>
                  <tr>
                    <td scope="row" data-label="Account">Corporate AMEX</td>
                    <td data-label="Due Date">03/01/2016</td>
                    <td data-label="Amount">$1,181</td>
                    <td data-label="Period">02/01/2016 - 02/29/2016</td>
                  </tr>
                  <tr>
                    <td scope="row" data-label="Acount">Visa - 3412</td>
                    <td data-label="Due Date">02/01/2016</td>
                    <td data-label="Amount">$842</td>
                    <td data-label="Period">01/01/2016 - 01/31/2016</td>
                  </tr>
                </tbody>
              </table>

              </div>

              <div className="right-div">
              <table>
                <caption>Specific Month</caption>
                <thead>
                  <tr>
                    <th scope="col">Account</th>
                    <th scope="col">Due Date</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Period</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td data-label="Account">Visa - 3412</td>
                    <td data-label="Due Date">04/01/2016</td>
                    <td data-label="Amount">$1,190</td>
                    <td data-label="Period">03/01/2016 - 03/31/2016</td>
                  </tr>
                  <tr>
                    <td scope="row" data-label="Account">Visa - 6076</td>
                    <td data-label="Due Date">03/01/2016</td>
                    <td data-label="Amount">$2,443</td>
                    <td data-label="Period">02/01/2016 - 02/29/2016</td>
                  </tr>
                  <tr>
                    <td scope="row" data-label="Account">Corporate AMEX</td>
                    <td data-label="Due Date">03/01/2016</td>
                    <td data-label="Amount">$1,181</td>
                    <td data-label="Period">02/01/2016 - 02/29/2016</td>
                  </tr>
                  <tr>
                    <td scope="row" data-label="Acount">Visa - 3412</td>
                    <td data-label="Due Date">02/01/2016</td>
                    <td data-label="Amount">$842</td>
                    <td data-label="Period">01/01/2016 - 01/31/2016</td>
                  </tr>
                </tbody>
              </table>

                
              </div>
              
            </div>
            <h2>bloggers</h2><br></br>
            <div className="tables">
            <div className="left-div">
              <table>
                <caption>Top 10 Blog Posts</caption>
                <thead>
                  <tr>
                    <th scope="col">Account</th>
                    <th scope="col">Due Date</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Period</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td data-label="Account">Visa - 3412</td>
                    <td data-label="Due Date">04/01/2016</td>
                    <td data-label="Amount">$1,190</td>
                    <td data-label="Period">03/01/2016 - 03/31/2016</td>
                  </tr>
                  <tr>
                    <td scope="row" data-label="Account">Visa - 6076</td>
                    <td data-label="Due Date">03/01/2016</td>
                    <td data-label="Amount">$2,443</td>
                    <td data-label="Period">02/01/2016 - 02/29/2016</td>
                  </tr>
                  <tr>
                    <td scope="row" data-label="Account">Corporate AMEX</td>
                    <td data-label="Due Date">03/01/2016</td>
                    <td data-label="Amount">$1,181</td>
                    <td data-label="Period">02/01/2016 - 02/29/2016</td>
                  </tr>
                  <tr>
                    <td scope="row" data-label="Acount">Visa - 3412</td>
                    <td data-label="Due Date">02/01/2016</td>
                    <td data-label="Amount">$842</td>
                    <td data-label="Period">01/01/2016 - 01/31/2016</td>
                  </tr>
                </tbody>
              </table>

              </div>

              <div className="right-div">
              <table>
                <caption>Specific Month</caption>
                <thead>
                  <tr>
                    <th scope="col">Account</th>
                    <th scope="col">Due Date</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Period</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td data-label="Account">Visa - 3412</td>
                    <td data-label="Due Date">04/01/2016</td>
                    <td data-label="Amount">$1,190</td>
                    <td data-label="Period">03/01/2016 - 03/31/2016</td>
                  </tr>
                  <tr>
                    <td scope="row" data-label="Account">Visa - 6076</td>
                    <td data-label="Due Date">03/01/2016</td>
                    <td data-label="Amount">$2,443</td>
                    <td data-label="Period">02/01/2016 - 02/29/2016</td>
                  </tr>
                  <tr>
                    <td scope="row" data-label="Account">Corporate AMEX</td>
                    <td data-label="Due Date">03/01/2016</td>
                    <td data-label="Amount">$1,181</td>
                    <td data-label="Period">02/01/2016 - 02/29/2016</td>
                  </tr>
                  <tr>
                    <td scope="row" data-label="Acount">Visa - 3412</td>
                    <td data-label="Due Date">02/01/2016</td>
                    <td data-label="Amount">$842</td>
                    <td data-label="Period">01/01/2016 - 01/31/2016</td>
                  </tr>
                </tbody>
              </table>

                
              </div>
              </div>
          </main>
          {/* End Main */}
        </div>

        
        
      </div>

      
    );
  
}


export default Admindashboard;
