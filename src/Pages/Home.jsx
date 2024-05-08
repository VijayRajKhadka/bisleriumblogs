import { useEffect, useState } from "react";
import React from "react";
import User from "../Assets/Images/user.png";
import '../Css/home.css';
import PostCard from "../Components/post_card";
const Home = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [blogs, setBlogs] = useState(null)

    useEffect(() => {
        const blogs = [
            {
                title: "My first blog",
                content: "This is mion_23-2150527121.jpg?size=626&e",
                imageUrl: "https://img.freepik.com/free-vector/flat-design-no-data-illustration_23-2150527121.jpg?size=626&ext=jpg",
                postedBy: "Vijay Raj Khadka",
                score: 0,
                postedOn: "2021-10-10",
                comments: 4,
                id: 1,
                likedByMe: true,
                savedByMe: true,
            },
            {
                title: "My second blog",
                content: "This is my second blog",
                imageUrl: null,
                postedBy: "Prasanna Bhattarai",
                score: 0,
                postedOn: "2021-10-10",
                comments: 4,
                id: 2,
                likedByMe: true,
                savedByMe: true,
            },
            {
                title: "My third blog",
                content: "This is my third blog",
                imageUrl: null,
                postedBy: "Kishan Raj Malla",
                score: 0,
                postedOn: "2021-10-10",
                comments: 4,
                id: 3,
                likedByMe: true,
                savedByMe: true,
            },
            {
                title: "My fourth blog",
                content: "This is my fourth blog",
                imageUrl: null,
                postedBy: "Pramit Badgami",
                score: 0,
                postedOn: "2021-10-10",
                comments: 4,
                id: 4,
                likedByMe: true,
                savedByMe: true,
            },
        ]
        setBlogs(blogs);
    }, [])

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div>
            <nav className="home-top-nav">
                <div className="left-section">
                    <a href="#" className="logo-name">
                        Bislerium Blogs
                    </a>
                </div>
                <div className="profile-container">
                    <a href="#" className="notification-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-bell" viewBox="0 0 16 16">
                            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                        </svg>
                    </a>
                    <div className="dropdown" onClick={toggleDropdown}>
                        <img className="profile-pic" src={User} alt="" />
                        {isDropdownOpen && (
                            <div className="dropdown-content">
                                <a href="#">Profile</a>
                                <a href="#">Change Password</a>
                                <a href="#" style={{ color: "red" }}>Logout</a>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            <aside class="sidebar">
                <nav>
                    <ul>
                        <div className="create-button">
                            <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                            </svg><a href="#"> Create Blog</a></li>
                        </div>
                        <li><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-house" viewBox="0 0 16 16">
                            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                        </svg><a href="#"> Home</a></li>
                        <hr style={{ opacity: "0.1" }} />
                        <li><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-bookmark" viewBox="0 0 16 16">
                            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                        </svg><a href="#"> Saved</a></li>
                        <hr style={{ opacity: "0.1" }} />
                        <li><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-journal-text" viewBox="0 0 16 16">
                            <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                            <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
                            <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
                        </svg><a href="#"> My Blogs</a></li>
                        <hr style={{ opacity: "0.1" }} />
                    </ul>
                </nav>
            </aside>
            <div className="content">
                {
                    blogs && blogs.map(blog => {
                        return <PostCard
                            title={blog.title}
                            content={blog.content}
                            imageUrl={blog.imageUrl}
                            postedBy={blog.postedBy}
                            postedOn={blog.postedOn}
                            score={blog.score}
                            comments={blog.comments}
                            id={blog.id}
                            likedByMe={blog.likedByMe}
                            savedByMe={blog.savedByMe}
                        />
                    })

                }

            </div>

        </div>
    )
}

export default Home;
