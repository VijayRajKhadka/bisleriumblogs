import { useState } from "react";
import React from "react";
import '../Css/home.css';
import PostCard from "../Components/post_card";
import SideBar from "../Components/side_bar";
import TopNav from "../Components/top_nav";
const Home = () => {
    
    return (
        <div>
            <TopNav/>
            <SideBar/>
                <div className="content">
                    <PostCard/>
                    <PostCard/>
                    <PostCard/>
                    <PostCard/>
                </div>

        </div>
    )
}

export default Home;
