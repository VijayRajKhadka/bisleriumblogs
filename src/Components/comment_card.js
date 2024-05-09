import React, { useState } from "react";
import "../Css/comment_card.css";
import User from "../Assets/Images/user.png";

const CommentCard = (props) => {
    const [showReplyCommentBox, setshowReplyCommentBox] = useState(false);
    const [showSeeMore, setshowSeeMore] = useState(false);

    
    const handleToggleReplyBox = () => {
        setshowReplyCommentBox(!showReplyCommentBox); 
    };

    const handleSeeReplies = () => {
        setshowSeeMore(!showSeeMore); 
    };


    return (
        <div style={{ marginBottom: "10px" }}>
            <div className="user-comment-container">
                <img className="profile-pic" src={User} alt="" />
                <p className="user-name">{props.comment.user.userName}</p>
                <p className="comment-date">3h ago</p>
            </div>
            <p className="user-comment">{props.comment.commentContent}</p>
            <div className="post-feed" style={{ marginLeft: "40px" }}>
                <div className="vote-box">
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
                        52k
                    </p>
                </div>
                <div className="vote-box" >
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
                        12k
                    </p>
                </div>
                <div className="vote-box" onClick={handleToggleReplyBox}>
                    <p style={{ fontSize: "14px" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-reply" viewBox="0 0 16 16">
                            <path d="M6.598 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.7 8.7 0 0 0-1.921-.306 7 7 0 0 0-.798.008h-.013l-.005.001h-.001L7.3 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L2.614 8.254l-.042-.028a.147.147 0 0 1 0-.252l.042-.028zM7.8 10.386q.103 0 .223.006c.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96z"/>
                        </svg>{" "}
                        12k
                    </p>
                </div>
            </div>
            {showReplyCommentBox && (
               
                <div className="comment-box" style={{ marginLeft: "40px" }}>
                     <p className="close-x-button" onClick={handleToggleReplyBox}>X</p>
                    <textarea placeholder="Write a comment" className="comment-input"> </textarea>
                    <button className="comment-button">Reply</button>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </div>
            )}
            <p className="see-replies" onClick={handleSeeReplies}> {showSeeMore?"hide replies":"see replies"}</p>
            <br/>
            {showSeeMore &&(
                <>
                <div className="comment-reply">
                <div className="user-comment-container">
                    <img className="profile-pic" src={User} alt="" />
                    <p className="user-name">{props.comment.user.userName}</p>
                    <p className="comment-date">3h ago</p>
                </div>
                
                <p className="user-comment">{props.comment.commentContent}</p>
                <div className="post-feed" style={{ marginLeft: "40px" }}>
                </div>
                </div>
                <div className="comment-reply">
                <div className="user-comment-container">
                    <img className="profile-pic" src={User} alt="" />
                    <p className="user-name">{props.comment.user.userName}</p>
                    <p className="comment-date">3h ago</p>
                </div>
                
                <p className="user-comment">{props.comment.commentContent}</p>
                <div className="post-feed" style={{ marginLeft: "40px" }}>
                </div>
                </div>
                </>
                
            )}
            <hr style={{ width: "93%", opacity: "0.22", marginLeft: "40px" }} />
        </div>
    );
};

export default CommentCard;
