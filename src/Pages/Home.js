import { useEffect, useState } from "react";
import React from "react";
import '../Css/home.css';
import PostCard from "../Components/post_card";

import NavBar from "../Components/NavBar";
import SideBar from "../Components/SideBar";
import { getLocalStorageItem } from "../services/LocalStorageService";
import { getAllBlogs } from "../services/BlogServices";
const Home = () => {
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
                            imageUrl={blog.images[0]}
                            postedBy={blog.user.userName}
                            postedOn={blog.postedOn}
                            score={blog.score}
                            comments={blog.comments}
                            id={blog.id}
                            likedByMe={blog.likedByMe}
                            savedByMe={blog.savedByMe}
                        />
                    })

                }

                {
                    !loading &&
                    !moreData &&
                    <div>
                        No more data
                    </div>
                }

            </div>

        </div>
    )
}

export default Home;
