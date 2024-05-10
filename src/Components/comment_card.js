import React, { useEffect, useState } from "react";
import "../Css/comment_card.css";
import User from "../Assets/Images/user.png";
import { deleteComment, downVoteComment, getCommentsWithReply, replyOnComment, upVoteComment, updateComment } from "../services/BlogServices";
import { getLocalStorageItem } from "../services/LocalStorageService";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const CommentCard = (props) => {
    const [showReplyCommentBox, setshowReplyCommentBox] = useState(false);
    const [showSeeMore, setshowSeeMore] = useState(false);
    const [replies, setReplies] = useState([])
    const [replyValue, setReplyValue] = useState("");
    const [showEditForm, setshowEditForm] = useState(false);
    const [commentEditValue, setCommentEditValue] = useState("");
    const [oldCommentValue, setoldCommentValue] = useState("");


    const [upVote, setUpVote] = useState(0)
    const [downVote, setDownVote] = useState(0)
    const [commentCount, setCommentCount] = useState(0)

    useEffect(() => {

        console.log(props.comment.commentId);
        setUpVote(props.comment.upvoteCount)
        setDownVote(props.comment.downvoteCount)
        setCommentCount(props.comment.commentCount)
        setoldCommentValue(props.comment.commentContent)
        getCommentsWithReply(props.comment.commentId).then(
            (res) => {
                console.log("🚀 ~ useEffect ~ res:", res)
                setReplies(res);
            }
        );
    }, []);


    const handleToggleReplyBox = () => {
        setshowReplyCommentBox(!showReplyCommentBox);
    };

    const handleSeeReplies = () => {
        setshowSeeMore(!showSeeMore);
    };

    const handleReply = () => {
        console.log(getLocalStorageItem("userId"))
        if (replyValue && replyValue != "") {
            var payload = {
                commentId: props.comment.commentId,
                data: {
                    "replyContent": replyValue,
                    "userId": getLocalStorageItem("userId").replace(/"/g, ""),
                }
            }
            console.log("🚀 ~ handleReply ~ payload:", payload)
            replyOnComment(payload).then(
                (res) => {
                    if (res) {
                        getCommentsWithReply(props.comment.commentId).then(
                            (res) => {
                                console.log("🚀 ~ useEffect ~ res:", res)
                                setReplies(res);
                            }
                        );
                        setshowReplyCommentBox(false);
                        setshowSeeMore(true);
                        var newCommCount = commentCount + 1
                        setCommentCount(newCommCount)
                    }
                }
            )


        }
    }

    const handleUpVote = () => {
        console.log(props.comment.isLikedByMe);
        if (props.comment.isLikedByMe === false) {
            upVoteComment(props.comment.commentId).then(
                (res) => {
                    if (res) {
                        setUpVote(upVote + 1)
                    }
                }
            )
        }

    }

    const handleDownVote = () => {
        console.log(props.comment.isDisLikedByMe);
        if (props.comment.isLikedByMe === false) {
            downVoteComment(props.comment.commentId).then(
                (res) => {
                    if (res) {
                        setDownVote(downVote + 1)
                    }
                }
            )
        }


    }
    const handleToggleEdit = () => {
        setshowEditForm(!showEditForm);
        console.log(showEditForm)
    };

    const handleDelete = () => {
        console.log("delete");
        deleteComment(props.comment.commentId).then(
            (res) => {
                if (res) {
                    console.log("deleted");
                    window.location.reload();
                    toast.success('Comment Deleted!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            }
        )
    }
    const handleChange = (e) => {
        setCommentEditValue(e.target.value);
    };

    const handleUpdate = () => {
        var payload = {
            "id": props.comment.commentId,
            "data": {
                "updatedContent": oldCommentValue,
                "commentId": props.comment.commentId
            }
        }
        console.log("🚀 ~ handleUpdate ~ payload", payload)
        updateComment(payload).then(
            (res) => {
                if (res) {
                    toast.success('Comment Updated!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setshowEditForm(false);
                    window.location.reload();
                }
            }
        )
    }

    return (
        <div style={{ marginBottom: "10px" }}>
            <div className="user-comment-container">
                <img className="profile-pic" src={User} alt="" />
                <p className="user-name">{props.comment.user.userName}</p>
                <p className="comment-date">3h ago</p>

                {
                    props.comment.user.userId === getLocalStorageItem("userId").replace(/"/g, "") && (

                        <div style={{ display: "flex", marginLeft: "30px", marginTop: "5px" }}>

                            <div className="edit-blog" onClick={handleToggleEdit}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="15"
                                    height="15"
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

                            <div className="delete-blog z-20" onClick={handleDelete}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="15"
                                    height="15"
                                    fill="currentColor"
                                    class="bi bi-trash"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                </svg>
                            </div>

                        </div>
                    )
                }



            </div>

            {showEditForm ? (
                <div>
                    <textarea
                        className="user-comment-edit"
                        value={oldCommentValue}
                        onChange={(e) => setoldCommentValue(e.target.value)
                        } />
                    <br />


                    <button className="update-button" onClick={handleUpdate}>Update</button>
                </div>


            )
                : <p className="user-comment">{props.comment.commentContent}</p>}
            <div className="post-feed" style={{ marginLeft: "40px" }}>
                <div className="vote-box " onClick={handleUpVote}>
                    <p style={{ fontSize: "14px" }}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="white"
                            className="bi bi-caret-up"
                            viewBox="0 0 16 16"
                        >
                            <path d="M3.204 11h9.592L8 5.519zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659" />
                        </svg>{" "}
                        {upVote}
                    </p>
                </div>
                <div className="vote-box" onClick={handleDownVote} >
                    <p style={{ fontSize: "14px" }}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="white"
                            className="bi bi-caret-down"
                            viewBox="0 0 16 16"
                        >
                            <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                        </svg>{" "}
                        {downVote}
                    </p>
                </div>
                <div className="vote-box" onClick={handleToggleReplyBox}>
                    <p style={{ fontSize: "14px" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-reply" viewBox="0 0 16 16">
                            <path d="M6.598 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.7 8.7 0 0 0-1.921-.306 7 7 0 0 0-.798.008h-.013l-.005.001h-.001L7.3 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L2.614 8.254l-.042-.028a.147.147 0 0 1 0-.252l.042-.028zM7.8 10.386q.103 0 .223.006c.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96z" />
                        </svg>{" "}
                        {commentCount}
                    </p>
                </div>
            </div>
            {showReplyCommentBox && (

                <div className="comment-box" style={{ marginLeft: "40px" }}>
                    <p className="close-x-button" onClick={handleToggleReplyBox}>X</p>
                    <textarea placeholder="Write a comment" className="comment-input" onChange={(e) => {
                        console.log(e.target.value)
                        setReplyValue(e.target.value)
                    }}> </textarea>
                    <button className="comment-button" onClick={handleReply}>Reply</button>
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
            )}
            <p className="see-replies" onClick={handleSeeReplies}> {showSeeMore ? "hide replies" : "see replies"}</p>
            <br />
            {showSeeMore && (
                <>
                    {replies[0].replies.map(
                        (reply) => {
                            return <div className="comment-reply">
                                <div className="user-comment-container">
                                    <img className="profile-pic" src={User} alt="" />
                                    <p className="user-name">{props.comment.user.userName}</p>
                                    <p className="comment-date">3h ago</p>
                                </div>

                                <p className="user-comment">{reply.commentContent}</p>
                                <div className="post-feed" style={{ marginLeft: "40px" }}>
                                </div>
                            </div>
                        }
                    )}
                </>

            )}
            <ToastContainer />
            <hr style={{ width: "93%", opacity: "0.22", marginLeft: "40px" }} />
        </div>
    );
};

export default CommentCard;
