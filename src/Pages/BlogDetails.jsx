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
import {
  commentOnBlog,
  deleteBLog,
  downVoteBlog,
  getAllComments,
  getBlogDetails,
  upVoteBlog,
} from "../services/BlogServices";
import { get, set } from "firebase/database";
import { getLocalStorageItem } from "../services/LocalStorageService";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { timeAgo } from "../helper/DateTimeHelper";


const BlogDetails = () => {
  // const data = props.location.state.data;
  let { id } = useParams();
  const [blogId, setBlogId] = useState(0);
  const [blogDetails, setBlogDetails] = useState(null);
  const [comments, setComments] = useState([]);
  const [showEditForm, setshowEditForm] = useState(false);

  //comment
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");


  const [upVoteCount, setUpVoteCount] = useState(0);
  const [downVoteCount, setDownVoteCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

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
      console.log("🚀 ~ getBlogDetails ~ res:", res)
      setBlogDetails(res);
      setUpVoteCount(res.upvoteCount);
      setDownVoteCount(res.downvoteCount);
      setCommentCount(res.commentCount)

    });

    getAllComments(id).then((res) => {
      setComments(res);
    });
  }, [id]); // Run this effect whenever id changes

  const handleComment = () => {
    console.log(blogDetails.user.userId == getLocalStorageItem("userId").replace(/"/g, ""));
    console.log(blogDetails.user.userId);
    console.log(getLocalStorageItem("userId"));
    if (validateComment()) {
      console.log(
        "🚀 ~ file: BlogDetails.jsx ~ line 120 ~ handleComment ~ comment",
        comment
      );
      var payload = {
        blogId: id,
        data: {
          commentContent: comment,
          blogId: id,
        },
      };
      commentOnBlog(payload).then((res) => {
        console.log(
          "🚀 ~ file: BlogDetails.jsx ~ line 120 ~ handleComment ~ res",
          res
        );
        setComment("");
        getAllComments(id).then((res) => {
          setComments(res);
          var newCommnetCount = commentCount + 1;
          setCommentCount(newCommnetCount);
        });
      });
      // console.log("🚀 ~ file: BlogDetails.jsx ~ line 120 ~ handleComment ~ payload", payload)
    }
  };

  const handleDelete = () => {
    deleteBLog(id).then(
      (res) => {
        if (res && res.status === 200) {
          toast.success('Deletion Successful!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: Bounce,
          });

          window.location.href = '/'

        } else {
          toast.error('Login Failed!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: Bounce,
          });
        }
      }
    );


  }
  const handleEdit = () => {

  }
  const handleToggleEdit = () => {
    setshowEditForm(!showEditForm);
    console.log(showEditForm)
  };


  const handleUpVode = () => {
    console.log(blogDetails.isLikedByMe);
    if (
      blogDetails.isLikedByMe === false
    ) {
      upVoteBlog(id).then(
        (res) => {
          console.log("🚀 ~ handleUpVode ~ res", res)
          if (res) {
            setUpVoteCount(upVoteCount + 1)
          }
        }
      )
    }

  }

  const handleDownVote = () => {
    console.log(blogDetails.isDisLikedByMe);

    if (
      blogDetails.isDisLikedByMe === false
    ) {

      // console.log("🚀 ~ handleDownVlog ~ payload", payload)
      downVoteBlog(id).then(
        (res) => {
          console.log("🚀 ~ handleDownVlog ~ res", res)
          if (res) {
            setDownVoteCount(downVoteCount + 1)
          }
        }
      )
    }
  }

  return (
    <div>
      <NavBar />
      <SideBar />



      {blogDetails ? (
        <div className="content">
          {showEditForm && (
            <div class="blog-edit-container">
              <button className="close-btn" onClick={handleToggleEdit}>X</button>
              <div class="blog-edit-form">
                <form onSubmit={handleEdit} class="space-y-2">
                  <input type="text" placeholder="Title" class="w-full px-3 py-2 border rounded-md focus:outline-none" value={blogDetails.title} />
                  <input type="text" placeholder="Content" class="w-full px-3 py-2 border rounded-md focus:outline-none" value={blogDetails.content} />
                  <p style={{ marginLeft: "10px", color: "white" }}>Replace Photo?</p>
                  <input type="file" accept="image/*" className="form-input w-full text-white rounded-md border border-white bg-transparent" />
                  <br />
                  <br />
                  <div style={{ float: "right" }}>
                    <span className="bg-transparent text-white border border-white py-2 px-4 rounded-md mr-5 w-1/2  hover:cursor-pointer hover:bg-teal-400">Save Changes</span>
                  </div>
                </form>
              </div>
            </div>

          )}
          <div className="blog-main-container h-screen">
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
                  <p className="post-date">{timeAgo(blogDetails.createdDateTime)}</p>
                </div>

                {blogDetails.user.userId == getLocalStorageItem("userId").replace(/"/g, "") ? (
                  <div style={{ display: "flex" }}>
                    <div className="edit-blog" onClick={handleToggleEdit}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        class="bi bi-pencil-square"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fill-rule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                        />
                      </svg>
                    </div>
                    <div className="delete-blog" onClick={handleDelete}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        class="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <div />
                )}
              </div>
              <div className="card-content">
                <p style={{ fontWeight: "bold" }}>
                  {blogDetails.title}
                </p>
                <p style={{ fontWeight: "200" }}>
                  {blogDetails.content}
                </p>
                {blogDetails.images.length > 0 ? (
                  <img
                    src={blogDetails.images[0]}
                    className="image-container"
                  ></img>
                ) : null}
                {/* <img src={Image1} className="image-container"></img> */}
                <br />
                <div className="post-feed">
                  <div className="vote-box " onClick={handleUpVode}>
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
                      {upVoteCount}
                    </p>
                  </div>
                  <div className="vote-box" onClick={handleDownVote}>
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
                      {downVoteCount}
                    </p>
                  </div>
                  <div className="comment-show">
                    {commentCount} comments
                  </div>
                </div>
                <br />
                <hr style={{ opacity: "0.22" }} />

                <br />

                <div className="comment-contaiter">
                  <p>Comments</p>
                  <br />
                  <textarea
                    placeholder="Write a comment"
                    className="comment-input"
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value);
                      console.log(
                        "🚀 ~ file: BlogDetails.jsx ~ line 191 ~ e.target.value",
                        e.target.value
                      );
                      validateComment();
                    }}
                  >
                    {" "}
                  </textarea>
                  <button className="comment-button" onClick={handleComment}>
                    Comment
                  </button>
                  <br />
                  <br />
                  <br />
                  <br />
                  {comments &&
                    comments.map((comment) => {
                      return <CommentCard comment={comment} />;
                    })}

                  <br />
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
              <p className="blog-user-bio">
                {" "}
                - {blogDetails.user.firstName} {blogDetails.user.lastName}
              </p>
              <p className="blog-user-bio"> - {blogDetails.user.email}</p>
              <p className="blog-user-bio">{blogDetails.user.bio}</p>
            </div>
          </div>
          <ToastContainer />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
export default BlogDetails;
