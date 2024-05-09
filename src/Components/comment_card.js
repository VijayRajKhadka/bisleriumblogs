import React from "react"
import "../Css/comment_card.css"
import User from "../Assets/Images/user.png"
const CommentCard = (props) => {
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
                            class="bi bi-caret-up"
                            viewBox="0 0 16 16"
                        >
                            <path d="M3.204 11h9.592L8 5.519zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659" />
                        </svg>{" "}
                        52k
                    </p>
                </div>
                <div className="vote-box">
                    <p style={{ fontSize: "14px" }}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="white"
                            class="bi bi-caret-down"
                            viewBox="0 0 16 16"
                        >
                            <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                        </svg>{" "}
                        12k
                    </p>
                </div>

            </div>
            <hr style={{ width: "93%", opacity: "0.22", marginLeft: "40px" }} />

        </div>
    )
}
export default CommentCard;