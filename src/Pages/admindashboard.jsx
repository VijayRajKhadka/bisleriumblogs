import React, { Component, useEffect, useState } from "react";
import axios from 'axios';
import "../Css/ad.css";
import Cookies from 'js-cookie'; 

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

  const [totalBlogs, setTotalBlogs] = useState(0);

  useEffect(() => {
    const fetchTotalBlogs = async () => {
      try {
        const response = await axios.get('https://localhost:7216/api/admin/allBlogCount');
        // Assuming the API response contains the total number of blogs as a property named "totalBlogs"
        setTotalBlogs(response.data.totalBlogs);
      } catch (error) {
        console.error('Error fetching total blogs:', error);
      }
    };

    fetchTotalBlogs();
  }, []);

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
  
    const data2 = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Count",
          data: [6, 3, 9, 2, 5, 0,0,0,0,0,0,0],
          backgroundColor: "#091ED0",
          // borderColor: "black",
          pointBorderColor: "black",
          fill: true,
          tension: 0.4,
        },
      ],
    };

    const options2 = {
      plugins: {
        legend: true,
      },
      scales: {
        y: {},
      },
    };

    const [totalUpvotes, setTotalUpvotes] = useState(0);

    useEffect(() => {
      const fetchData = async () => {
        try {
          // Fetch the admin token from cookies
          const adminToken = Cookies.get('adminToken'); // Replace 'adminToken' with the name of your admin token cookie
          
          const headers = {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${adminToken}`, // Include the admin token in the Authorization header
          };
    
          const response = await axios.get('https://localhost:7216/api/admin/totalUpvotes', { headers });
          setTotalUpvotes(response.data.totalUpvotes); 
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchData();
    }, []);

    const [totalDownvotes, setTotalDownvotes] = useState(0);

useEffect(() => {
  const fetchData = async () => {
    try {
      const adminToken = Cookies.get('adminToken');
      
      const headers = {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${adminToken}`,
      };

      const response = await axios.get('https://localhost:7216/api/admin/totalDownvotes', { headers });
      setTotalDownvotes(response.data.totalDownvotes); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);


      


    

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
                <h1>{totalBlogs}</h1>
              </div>
              <div className="card">
                <div className="card-inner">
                  <h3>UPVOTE</h3>
                  <span className="material-icons-outlined">category</span>
                </div>
                <h1>{totalUpvotes}</h1>
              </div>
              <div className="card">
                <div className="card-inner">
                  <h3>DOWNVOTE</h3>
                  <span className="material-icons-outlined">groups</span>
                </div>
                <h1>{totalDownvotes}</h1>
              </div>
              <div className="card">
                <div className="card-inner">
                  <h3>COMMENTS</h3>
                  <span className="material-icons-outlined">groups</span>
                </div>
                <h1>18</h1>
              </div>
              <div className="card">
                <div className="card-inner">
                  <h3>USERS</h3>
                  <span className="material-icons-outlined">
                    notification_important
                  </span>
                </div>
                <h1>16</h1>
              </div>
            </div>
            <div className="charts">
              <div className="charts-card">
                <h2 className="chart-title">Most Blog Posted</h2>
                <div className="dataCard customerCard">
                  <Line data={data2} options={options2} />
                </div>
              </div>
              <div className="charts-card">
                <h2 className="chart-title">Most Upvotes</h2>
                <div className="dataCard customerCard">
                  <Bar
                    data={{
                      labels: sourceData.map((data) => data.label),
                      datasets: [
                        {
                          label: "Upvotes per month",
                          data: sourceData.map((data) => data.value),
                          backgroundColor: [
                            "rgba(43, 63, 229, 0.8)",
                            "rgba(250, 192, 19, 0.8)",
                            "rgba(253, 135, 135, 0.8)",
                            "rgba(255, 0, 0, 0.8)",     
                            "rgba(0, 255, 0, 0.8)",       
                            "rgba(0, 0, 255, 0.8)",       
                            "rgba(255, 255, 0, 0.8)",     
                            "rgba(255, 0, 255, 0.8)",     
                            "rgba(128, 128, 128, 0.8)",   
                            "rgba(255, 165, 0, 0.8)",     
                            "rgba(0, 255, 255, 0.8)",   
                            "rgba(255, 255, 255, 0.8)"
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
                <h2 className="chart-title">Most Downvotes</h2>
                <div className="dataCard customerCard">
                  <Bar
                    data={{
                      labels: sourceData.map((data) => data.label),
                      datasets: [
                        {
                          label: "Downvotes per month",
                          data: sourceData.map((data) => data.value),
                          backgroundColor: [
                            "rgba(43, 63, 229, 0.8)",
                            "rgba(250, 192, 19, 0.8)",
                            "rgba(253, 135, 135, 0.8)",
                            "rgba(255, 0, 0, 0.8)",     
                            "rgba(0, 255, 0, 0.8)",       
                            "rgba(0, 0, 255, 0.8)",       
                            "rgba(255, 255, 0, 0.8)",     
                            "rgba(255, 0, 255, 0.8)",     
                            "rgba(128, 128, 128, 0.8)",   
                            "rgba(255, 165, 0, 0.8)",     
                            "rgba(0, 255, 255, 0.8)",   
                            "rgba(255, 255, 255, 0.8)"
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
                <h2 className="chart-title">Most Comments</h2>
                <div className="dataCard customerCard">
                  <Line data={data2} options={options2} />
                </div>
              </div>
            </div><br></br>

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

            </center><br></br><br></br>


            <center><h1 style={{ fontSize: '40px' }}>Top 10 Most Popular Bloggers (All Time)</h1><br></br></center>

            <div className="tables">
              <div className="left-div">
              
              <div className="top-users">
              <div className="user">
                <h1>1</h1>
                <div className="user-image">
                  <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" alt="User" />
                </div>
                <div className="user-name">
                  <strong>Vijay Raj Khadka:  </strong>
                </div>
                <div className="user-name">
                  
                </div>
                <div className="user-bio">
                  "I love click photos and videos of beautiful people and places"
                </div>
              </div>
            </div>
            <div className="top-users">
              <div className="user">
                <h1>2</h1>
                <div className="user-image">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D" alt="User" />
                </div>
                <div className="user-name">
                  <strong>Emma Smith: </strong>
                </div>
                <div className="user-bio">
                  "Passionate about exploring new places and trying exotic cuisines."
                </div>
              </div>
            </div>
            <div className="top-users">
              <div className="user">
                <h1>3</h1>
                <div className="user-image">
                  <img src="data:image/jpeg;base64,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" alt="User" />
                </div>
                <div className="user-name">
                  <strong>David Patel: </strong>
                </div>
                <div className="user-bio">
                  "Tech enthusiast who loves coding and building cool projects."
                </div>
              </div>
            </div>
            <div className="top-users">
              <div className="user">
                <h1>4</h1>
                <div className="user-image">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDJzEaxLN-jGRYYUO65pWu7Q9GXoNt4LUSSA&s" alt="User" />
                </div>
                <div className="user-name">
                  <strong>Sophie Johnson: </strong>
                </div>
                <div className="user-bio">
                  "Bookworm by day, gamer by night. Always up for an adventure."
                </div>
              </div>
            </div>
            <div className="top-users">
              <div className="user">
                <h1>5</h1>
                <div className="user-image">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqWtpaInVApJX83uiS6ZcNdp8R92LJjc9cEg&s" alt="User" />
                </div>
                <div className="user-name">
                  <strong>Michael Brown: </strong>
                </div>
                <div className="user-bio">
                  "Fitness freak and adrenaline junkie. Living life one workout at a time."
                </div>
              </div>
            </div>
            <div className="top-users">
              <div className="user">
                <h1>6</h1>
                <div className="user-image">
                  <img src="https://media.istockphoto.com/id/1296158947/photo/portrait-of-creative-trendy-black-african-male-designer-laughing.jpg?s=612x612&w=0&k=20&c=1Ws_LSzWjYvegGxHYQkkgVytdpDcnmK0upJyGOzEPcg=" alt="User" />
                </div>
                <div className="user-name">
                  <strong>Olivia Williams: </strong>
                </div>
                <div className="user-bio">
                  "Art lover with a knack for DIY projects and crafting."
                </div>
              </div>
            </div>
            <div className="top-users">
              <div className="user">
                <h1>7</h1>
                <div className="user-image">
                  <img src="https://img.freepik.com/free-photo/happiness-wellbeing-confidence-concept-cheerful-attractive-african-american-woman-curly-haircut-cross-arms-chest-self-assured-powerful-pose-smiling-determined-wear-yellow-sweater_176420-35063.jpg" alt="User" />
                </div>
                <div className="user-name">
                  <strong>James Jones: </strong>
                </div>
                <div className="user-bio">
                  "Music aficionado and aspiring musician. Never seen without headphones."
                </div>
              </div>
            </div>
            <div className="top-users">
              <div className="user">
                <h1>8</h1>
                <div className="user-image">
                  <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" alt="User" />
                </div>
                <div className="user-name">
                  <strong>Ava Davis: </strong>
                </div>
                <div className="user-bio">
                  "Animal lover and nature enthusiast. Dreaming of traveling the world."
                </div>
              </div>
            </div>
            <div className="top-users">
              <div className="user">
                <h1>9</h1>
                <div className="user-image">
                  <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" alt="User" />
                </div>
                <div className="user-name">
                  <strong>Ethan Martinez: </strong>
                </div>
                <div className="user-bio">
                  ""Foodie on a mission to find the best burger in town. Burgers , Everything."
                </div>
              </div>
            </div>
            <div className="top-users">
              <div className="user">
                <h1>10</h1>
                <div className="user-image">
                  <img src="https://media.istockphoto.com/id/1834732876/photo/young-black-businessman-walking-outside-with-cellphone-and-laptop-bag.jpg?s=612x612&w=0&k=20&c=NAx5IBLmJ9-M1BQN3s7mY_ThM-d3BXRUL-Fyb8iejBU=" alt="User" />
                </div>
                <div className="user-name">
                  <strong>Isabella Garcia: </strong>
                </div>
                <div className="user-bio">
                  "Fashionista with a passion for runway shows and haute couture."
                </div>
              </div>
              
            </div>
                
                
              </div>
            </div><br></br><br></br>

              
            <center><h1 style={{ fontSize: '40px' }}>Top 10 Most Popular Bloggers (Specific Month)</h1><br></br></center>
            <div class="navigation">
              <div class="arrow left-arrow">&lt;</div>
              <div class="month">May</div>
              <div class="arrow right-arrow">&gt;</div>
            </div>
            <div className="tables">
              <div className="left-div">
              
              <div className="top-users">
              <div className="user">
                <h1>1</h1>
                <div className="user-image">
                  <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" alt="User" />
                </div>
                <div className="user-name">
                  <strong>Vijay Raj Khadka:  </strong>
                </div>
                <div className="user-name">
                  
                </div>
                <div className="user-bio">
                  "I love click photos and videos of beautiful people and places"
                </div>
              </div>
            </div>
            <div className="top-users">
              <div className="user">
                <h1>2</h1>
                <div className="user-image">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D" alt="User" />
                </div>
                <div className="user-name">
                  <strong>Emma Smith: </strong>
                </div>
                <div className="user-bio">
                  "Passionate about exploring new places and trying exotic cuisines."
                </div>
              </div>
            </div>
            <div className="top-users">
              <div className="user">
                <h1>3</h1>
                <div className="user-image">
                  <img src="data:image/jpeg;base64,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" alt="User" />
                </div>
                <div className="user-name">
                  <strong>David Patel: </strong>
                </div>
                <div className="user-bio">
                  "Tech enthusiast who loves coding and building cool projects."
                </div>
              </div>
            </div>
            <div className="top-users">
              <div className="user">
                <h1>4</h1>
                <div className="user-image">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDJzEaxLN-jGRYYUO65pWu7Q9GXoNt4LUSSA&s" alt="User" />
                </div>
                <div className="user-name">
                  <strong>Sophie Johnson: </strong>
                </div>
                <div className="user-bio">
                  "Bookworm by day, gamer by night. Always up for an adventure."
                </div>
              </div>
            </div>
            <div className="top-users">
              <div className="user">
                <h1>5</h1>
                <div className="user-image">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqWtpaInVApJX83uiS6ZcNdp8R92LJjc9cEg&s" alt="User" />
                </div>
                <div className="user-name">
                  <strong>Michael Brown: </strong>
                </div>
                <div className="user-bio">
                  "Fitness freak and adrenaline junkie. Living life one workout at a time."
                </div>
              </div>
            </div>
            <div className="top-users">
              <div className="user">
                <h1>6</h1>
                <div className="user-image">
                  <img src="https://media.istockphoto.com/id/1296158947/photo/portrait-of-creative-trendy-black-african-male-designer-laughing.jpg?s=612x612&w=0&k=20&c=1Ws_LSzWjYvegGxHYQkkgVytdpDcnmK0upJyGOzEPcg=" alt="User" />
                </div>
                <div className="user-name">
                  <strong>Olivia Williams: </strong>
                </div>
                <div className="user-bio">
                  "Art lover with a knack for DIY projects and crafting."
                </div>
              </div>
            </div>
            <div className="top-users">
              <div className="user">
                <h1>7</h1>
                <div className="user-image">
                  <img src="https://img.freepik.com/free-photo/happiness-wellbeing-confidence-concept-cheerful-attractive-african-american-woman-curly-haircut-cross-arms-chest-self-assured-powerful-pose-smiling-determined-wear-yellow-sweater_176420-35063.jpg" alt="User" />
                </div>
                <div className="user-name">
                  <strong>James Jones: </strong>
                </div>
                <div className="user-bio">
                  "Music aficionado and aspiring musician. Never seen without headphones."
                </div>
              </div>
            </div>
            <div className="top-users">
              <div className="user">
                <h1>8</h1>
                <div className="user-image">
                  <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" alt="User" />
                </div>
                <div className="user-name">
                  <strong>Ava Davis: </strong>
                </div>
                <div className="user-bio">
                  "Animal lover and nature enthusiast. Dreaming of traveling the world."
                </div>
              </div>
            </div>
            <div className="top-users">
              <div className="user">
                <h1>9</h1>
                <div className="user-image">
                  <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" alt="User" />
                </div>
                <div className="user-name">
                  <strong>Ethan Martinez: </strong>
                </div>
                <div className="user-bio">
                  ""Foodie on a mission to find the best burger in town. Burgers , Everything."
                </div>
              </div>
            </div>
            <div className="top-users">
              <div className="user">
                <h1>10</h1>
                <div className="user-image">
                  <img src="https://media.istockphoto.com/id/1834732876/photo/young-black-businessman-walking-outside-with-cellphone-and-laptop-bag.jpg?s=612x612&w=0&k=20&c=NAx5IBLmJ9-M1BQN3s7mY_ThM-d3BXRUL-Fyb8iejBU=" alt="User" />
                </div>
                <div className="user-name">
                  <strong>Isabella Garcia: </strong>
                </div>
                <div className="user-bio">
                  "Fashionista with a passion for runway shows and haute couture."
                </div>
              </div>
              </div>
              </div>
             
            
              
            
                
                
            </div>
          </main>
          {/* End Main */}
        </div>

        
        
      </div>
    );
  
}

export default Admindashboard;