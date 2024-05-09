import React, { useState } from "react";
import { useEffect } from "react";
import PostCard from "../Components/post_card";
import SideBar from "../Components/SideBar";
import TopNav from "../Components/top_nav";
import User from "../Assets/Images/user.png";
import CommentCard from "../Components/comment_card";
import "../Css/blog_details.css";
import Image1 from "../Assets/Images/login-background.jpg";
import NavBar from "../Components/NavBar";
import GlobalService from "../services/GlobalService";
import { useParams } from "react-router-dom";
import { commentOnBlog, getAllComments, getBlogDetails } from "../services/BlogServices";
import { get } from "firebase/database";

const BlogDetails = () => {
  // const data = props.location.state.data;
  let { id } = useParams();
  const [blogId, setBlogId] = useState(0);
  const [blogDetails, setBlogDetails] = useState(null);
  const [comments, setComments] = useState([]);

  //comment
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");

  //validate comment
  const validateComment = () => {
    let isValid = true;
    if (comment === "") {
      setCommentError("Comment is required");
      isValid = false;
    } else {
      setCommentError("");
    }
    return isValid;
  };

  useEffect(() => {
    console.log(id);
    setBlogId(id);

    getBlogDetails(id).then((res) => {
      setBlogDetails(res);
    });

    getAllComments(id).then((res) => {
      setComments(res);
    });
  }, [id]); // Run this effect whenever id changes




  const handleComment = () => {
    if (validateComment()) {
      console.log("🚀 ~ file: BlogDetails.jsx ~ line 120 ~ handleComment ~ comment", comment)
      var payload = {
        blogId: id,
        data: {
          "commentContent": comment,
          "blogId": id
        }

      }
      commentOnBlog(payload).then((res) => {
        console.log("🚀 ~ file: BlogDetails.jsx ~ line 120 ~ handleComment ~ res", res);
        getAllComments(id).then((res) => {
          setComments(res);
        });
      });
      // console.log("🚀 ~ file: BlogDetails.jsx ~ line 120 ~ handleComment ~ payload", payload)
    }

  }

  return (
    <div>
      <NavBar />
      <SideBar />
      {blogDetails ? (
        <div className="content">
          <div className="blog-main-container">
            <div className="blog-container">
              <div className="head-container">
                <div
                  style={{
                    display: "flex",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img className="profile-pic" src={User} alt="" />
                  <p className="user-name">{blogDetails.user.userName}</p>
                  <p className="post-date">3 days ago</p>
                </div>
                <div className="saved">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="white"
                    class="bi bi-bookmark"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                  </svg>
                </div>
              </div>
              <div className="card-content">
                <p>
                  {blogDetails.content}
                </p>
                {
                  blogDetails.images.length > 0 ? <img src={blogDetails.images[0]} className="image-container"></img> : null
                }
                {/* <img src={Image1} className="image-container"></img> */}
                <br />
                <div className="post-feed">
                  <div className="vote-box">
                    <p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="white"
                        class="bi bi-caret-up"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.204 11h9.592L8 5.519zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659" />
                      </svg>{" "}
                      52k
                    </p>
                  </div>
                  <div className="vote-box">
                    <p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="white"
                        class="bi bi-caret-down"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                      </svg>{" "}
                      12k
                    </p>
                  </div>
                  <div className="comment-show">
                    {blogDetails.commentCount} comments
                  </div>

                </div>
                <br />
                <hr style={{ opacity: "0.22" }} />

                <br />

                <div className="comment-contaiter">
                  <p>Comments</p>
                  <br />
                  <textarea placeholder="Write a comment" className="comment-input" onChange={(e) => {
                    setComment(e.target.value);
                    console.log("🚀 ~ file: BlogDetails.jsx ~ line 191 ~ e.target.value", e.target.value)
                    validateComment();
                  }}> </textarea>
                  <button className="comment-button" onClick={handleComment}>Comment</button>
                  <br />
                  <br />
                  <br />
                  <br />
                  {
                    comments && comments.map((comment) => {
                      return <CommentCard comment={comment} />
                    }
                    )
                  }

                  <br />
                  <center>
                    <button className="view-more-comment-button">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16" style={{ marginRight: "2px" }}>
                        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                      </svg>
                      View More Comment
                    </button>
                  </center>




                </div>

              </div>


            </div>

            <div className="user-container">
              <h1>Posted By</h1>
              <div style={{ display: "flex", marginTop: "10px" }}>
                <img className="profile-pic" src={User} alt="" />
                <p className="blog-user-name">@{blogDetails.user.userName}</p>
                <br />
              </div>
              <p className="blog-user-bio"> - {blogDetails.user.firstName} {blogDetails.user.lastName}</p>
              <p className="blog-user-bio"> - {blogDetails.user.email}</p>
              <p className="blog-user-bio">{blogDetails.user.bio}</p>

            </div>
          </div>
        </div>

      ) : (
        <div>
          Loading...
        </div>
      )

      }

    </div>
  );
};
export default BlogDetails;
