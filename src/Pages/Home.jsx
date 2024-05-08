import { useEffect, useState } from "react";
import React from "react";
import '../Css/home.css';
import PostCard from "../Components/post_card";
import GlobalService from "../services/GlobalService";
import { Link } from "react-router-dom";
import NavBar from "../Components/NavBar";
import SideBar from "../Components/SideBar";
import { getLocalStorageItem } from "../services/LocalStorageService";
const Home = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [blogs, setBlogs] = useState(null)

    useEffect(() => {
        // console.log(GlobalService.blogs);
        setBlogs(getLocalStorageItem('blogs') || []);
    }, [])

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div>
            <NavBar />
            <SideBar />

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
