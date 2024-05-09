import React from "react";
import "../Css/post_card.css";
import User from "../Assets/Images/user.png";
import Image1 from "../Assets/Images/login_background.jpg";


const post_card=()=> {
  return (
    <div>
      <div className="card-container">
        <div className="head-container">
          <div style={{display:"flex", alignContent:"center", alignItems:"center"}}>
            <img className="profile-pic" src={User} alt="" />
            <p className="user-name">Shirish Joncheen</p>
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
            My best moves start with the best nutrients. That’s why I don’t go
            anywhere without 1 to keep me at peak performance. I call this move
            The Formula 1 Shot.
          </p>
          <img src={Image1} className="image-container"></img>
        </div>
        <div className="post-feed" style={{marginLeft:"50px"}}>
          <div className="feed-box">
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
          <div className="feed-box">
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
          <div className="feed-box">
            <p>
              <svg style={{marginRight:"5px"}}
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                class="bi bi-chat-left-text"
                viewBox="0 0 16 16"
              >
                <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
              </svg>{" "}
               2k
            </p>
          </div>
        </div>
      </div>
      <hr style={{width:"60%", opacity:"0.22", marginLeft:"20px"}}/>
    </div>
  );
}
export default post_card;
