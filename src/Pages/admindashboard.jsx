import React, { Component, useEffect, useState } from "react";
import "../Css/ad.css";

import { chart as charts } from "chart.js/auto";

import { Line } from "react-chartjs-2";

import { Bar, Doughnut, line } from "react-chartjs-2";

import sourceData from "./data/sourceData.json";
import Sidebar from "./AdminSidebar";

import { getAllBlogs } from "../services/BlogServices";
import PostCard from "../Components/post_card";
import Cookies from "js-cookie";
import axios from "axios";

const Admindashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageSize = 10;
  const [moreData, setMoreData] = useState(true);

  const [totalBlogs, setTotalBlogs] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the admin token from cookies
        const adminToken = Cookies.get("adminToken"); // Replace 'adminToken' with the name of your admin token cookie

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`, // Include the admin token in the Authorization header
        };

        const response = await axios.get(
          "https://localhost:7216/api/admin/allBlogCount",
          { headers }
        );
        setTotalBlogs(response.data.blogCount);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const adminToken = Cookies.get("adminToken");

    // Fetching data from the API
    fetch("https://localhost:7216/api/admin/popularBlogs", {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setBlogs(data))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  const [blogCounts, setBlogCounts] = useState(Array(12).fill(0));

  useEffect(() => {
    const fetchData = async (month) => {
      try {
        const adminToken = Cookies.get("adminToken");
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        };
        const response = await axios.get(
          `https://localhost:7216/api/admin/blogcount?month=${month}&year=2024`,
          { headers }
        );
        return response.data.blogCount;
      } catch (error) {
        console.error("Error fetching data:", error);
        return 0;
      }
    };

    const fetchBlogCounts = async () => {
      const counts = [];
      for (let month = 1; month <= 12; month++) {
        const count = await fetchData(month);
        counts.push(count);
      }
      setBlogCounts(counts);
    };

    fetchBlogCounts();
  }, []);

  const data2 = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Blog Count",
        data: blogCounts,
        backgroundColor: "#091ED0",
        borderColor: "black",
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

  const [commentCounts, setCommentCounts] = useState(Array(12).fill(0));

  useEffect(() => {
    const fetchData = async (month) => {
      try {
        const adminToken = Cookies.get("adminToken");
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        };
        const response = await axios.get(
          `https://localhost:7216/api/admin/commentcount?month=${month}&year=2024`,
          { headers }
        );
        return response.data.commentCount;
      } catch (error) {
        console.error("Error fetching data:", error);
        return 0;
      }
    };

    const fetchCommentCounts = async () => {
      const counts = [];
      for (let month = 1; month <= 12; month++) {
        const count = await fetchData(month);
        counts.push(count);
      }
      setCommentCounts(counts);
    };

    fetchCommentCounts();
  }, []);

  const data3 = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Comment Count",
        data: commentCounts,
        backgroundColor: "#FF5733",
        borderColor: "black",
        pointBorderColor: "black",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options3 = {
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
        const adminToken = Cookies.get("adminToken"); // Replace 'adminToken' with the name of your admin token cookie

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`, // Include the admin token in the Authorization header
        };

        const response = await axios.get(
          "https://localhost:7216/api/admin/totalUpvotes",
          { headers }
        );
        setTotalUpvotes(response.data.totalUpvotes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [totalDownvotes, setTotalDownvotes] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminToken = Cookies.get("adminToken");

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        };

        const response = await axios.get(
          "https://localhost:7216/api/admin/totalDownvotes",
          { headers }
        );
        setTotalDownvotes(response.data.totalDownvotes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [allCommentCount, setallCommentCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminToken = Cookies.get("adminToken");

        const headers = {
          Authorization: `Bearer ${adminToken}`,
        };

        const response = await axios.get(
          "https://localhost:7216/api/admin/allCommentCount",
          { headers }
        );
        setallCommentCount(response.data.blogCount);
        console.log(response);
        console.log(allCommentCount);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [sourceData, setSourceData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminToken = Cookies.get("adminToken"); // Get the admin token from cookies
        const data = [];
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        for (let month = 1; month <= 12; month++) {
          const response = await axios.get(
            `https://localhost:7216/api/admin/upvoteSum?month=${month}&year=2024`,
            {
              headers: {
                Authorization: `Bearer ${adminToken}`, // Include the admin token in the Authorization header
              },
            }
          );
          data.push({
            label: monthNames[month - 1],
            value: response.data.upvoteSum,
          });
        }
        setSourceData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [downvoteData, setDownvoteData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminToken = Cookies.get("adminToken");
        const downdata = [];
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        for (let month = 1; month <= 12; month++) {
          const response = await axios.get(
            `https://localhost:7216/api/admin/downvoteSum?month=${month}&year=2024`,
            {
              headers: {
                Authorization: `Bearer ${adminToken}`,
              },
            }
          );
          downdata.push({
            label: monthNames[month - 1],
            value: response.data.downvoteSum,
          });
        }
        setDownvoteData(downdata);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [popularUsers, setPopularUsers] = useState([]);

  useEffect(() => {
    const adminToken = Cookies.get("adminToken");
    // Fetch data from the API
    fetch("https://localhost:7216/api/admin/popularUsers", {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setPopularUsers(data))
      .catch((error) => console.error("Error fetching popular users:", error));
  }, []);

  const [selectedMonth, setSelectedMonth] = useState(1); // Initialize selectedMonth with January (1)

  useEffect(() => {
    console.log(selectedMonth); // Log the selectedMonth inside the useEffect hook
    fetchPopularUsers(selectedMonth);
  }, [selectedMonth]);

  const fetchPopularUsers = (month) => {
    const adminToken = Cookies.get("adminToken");

    fetch(
      `https://localhost:7216/api/admin/popularUsersByMonth?month=${month}&year=2024`,
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setPopularUsers(data);
      })
      .catch((error) => console.error("Error fetching popular users:", error));
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
    console.log(fetchPopularUsers);
    fetchPopularUsers(selectedMonth);
    // window.location.reload();
  };

  const [selectedMonth2, setSelectedMonth2] = useState(1); // Default month is January
  const [topBlogs, setTopBlogs] = useState([]);

  useEffect(() => {
    fetchTopBlogs(selectedMonth);
  }, [selectedMonth]);

  const fetchTopBlogs = (month) => {
    fetch(
      `https://localhost:7216/api/admin/popularBlogsByMonth?month=${month}&year=2024`
    )
      .then((response) => response.json())
      .then((data) => setTopBlogs(data))
      .catch((error) => console.error("Error fetching top blogs:", error));
  };

  const handleMonthChange2 = (event) => {
    setSelectedMonth(parseInt(event.target.value));
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
              <h1>{allCommentCount}</h1>
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
                          "rgba(255, 255, 255, 0.8)",
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
                    labels: downvoteData.map((data) => data.label),
                    datasets: [
                      {
                        label: "Downvotes per month",
                        data: downvoteData.map((data) => data.value),
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
                          "rgba(255, 255, 255, 0.8)",
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
                    scales: {
                      x: {
                        title: {
                          display: true,
                          text: "Month",
                        },
                      },
                      y: {
                        title: {
                          display: true,
                          text: "Downvotes",
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>

            <div className="charts-card">
              <h2 className="chart-title">Most Comments</h2>
              <div className="dataCard customerCard">
                <Line data={data3} options={options3} />
              </div>
            </div>
          </div>
          <br></br>

          <center>
            <h1 style={{ fontSize: "50px" }}>Top 10 Most Popular Blogs</h1>
            <br></br>
          </center>
          <center>
            {blogs &&
              blogs.map((blog, index) => {
                return (
                  <div key={blog.id} style={{ position: "relative" }}>
                    <div
                      style={{
                        position: "absolute",
                        top: "5%",
                        left: 0,
                        transform: "translateY(-50%)",
                        padding: "5px",
                      }}
                    >
                      <span style={{ fontSize: "50px" }}> {index + 1}</span>
                    </div>

                    <PostCard
                      title={blog.title}
                      content={blog.content}
                      imageUrl={blog.images[0]}
                      postedBy={blog.user.userName}
                      postedOn={blog.createdDateTime}
                      score={blog.popularityScore}
                      comments={blog.commentCount}
                      id={blog.id}
                      likedByMe={blog.isLikedByMe}
                      savedByMe={blog.isSavedByMe}
                    />
                  </div>
                );
              })}
          </center>

          <center>
            <h1 style={{ fontSize: "40px" }}>
              Top 10 Most Popular Blogs (Specific Month)
            </h1>
            <br></br>
            <select value={selectedMonth2} onChange={handleMonthChange2}>
              <option value={1}>January</option>
              <option value={2}>February</option>
              <option value={3}>March</option>
              <option value={4}>April</option>
              <option value={5}>May</option>
              <option value={6}>June</option>
              <option value={7}>July</option>
              <option value={8}>August</option>
              <option value={9}>September</option>
              <option value={10}>October</option>
              <option value={11}>November</option>
              <option value={12}>December</option>
            </select>
            <br />
          </center>

          <div className="tables">
            <div className="left-div">
              {topBlogs.map((blog, index) => (
                <div className="top-blogs" key={blog.id}>
                  <div className="blog">
                    <h1>{index + 1}</h1>
                    <div className="blog-content">
                      <h2>{blog.title}</h2>
                      <p>{blog.content}</p>
                    </div>
                    <div className="blog-author">
                      <strong>Author: </strong>
                      {`${blog.user.firstName} ${blog.user.lastName}`}
                    </div>
                    <div className="blog-image">
                      <img src={blog.images[0]} alt="Blog" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <center>
            <h1 style={{ fontSize: "40px" }}>
              Top 10 Most Popular Bloggers (All Time)
            </h1>
            <br></br>
          </center>

          <div className="tables">
            <div className="left-div">
              {popularUsers.map((user, index) => (
                <div className="top-users" key={user.userId}>
                  <div className="user">
                    <h1>{index + 1}</h1>
                    <div className="user-image">
                      {/* Use a placeholder image since the API response doesn't provide user images */}
                      <img src="https://via.placeholder.com/100" alt="User" />
                    </div>
                    <div className="user-name">
                      {/* Combine first name and last name */}
                      <strong>{`${user.firstName} ${user.lastName}: `}</strong>
                    </div>
                    {/* No need for an extra empty user-name div */}
                    <div className="user-bio">
                      {/* Display user's bio */}
                      {user.bio}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <br></br>
          <br></br>

          <center>
            <h1 style={{ fontSize: "40px" }}>
              Top 10 Most Popular Bloggers (Specific Month)
            </h1>
            <br></br>
            <select value={selectedMonth} onChange={handleMonthChange}>
              <option value={1}>January</option>
              <option value={2}>February</option>
              <option value={3}>March</option>
              <option value={4}>April</option>
              <option value={5}>May</option>
              <option value={6}>June</option>
              <option value={7}>July</option>
              <option value={8}>August</option>
              <option value={9}>September</option>
              <option value={10}>October</option>
              <option value={11}>November</option>
              <option value={12}>December</option>
            </select>
            <br />
          </center>

          <div className="tables">
            <div className="left-div">
              {popularUsers.map((user, index) => (
                <div className="top-users" key={user.userId}>
                  <div className="user">
                    <h1>{index + 1}</h1>
                    <div className="user-image">
                      <img
                        src={`data:image/jpeg;base64,${user.userImageName}`}
                        alt="User"
                      />
                    </div>
                    <div className="user-name">
                      <strong>{`${user.firstName} ${user.lastName}: `}</strong>
                    </div>
                    <div className="user-bio">{user.bio}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        {/* End Main */}
      </div>
    </div>
  );
};

export default Admindashboard;
