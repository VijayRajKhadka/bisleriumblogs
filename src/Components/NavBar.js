import { useState, useEffect } from "react";
import User from "../Assets/Images/user.png";
import { getLocalStorageItem } from "../services/LocalStorageService";
import { getUnreadNotificationCount } from "../services/NotificationServices";
import { signalRService } from "../services/SignalRServices";


const NavBar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [unreadNotification, setUnreadNotification] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/';
    }

    useEffect(() => {
        console.log("helo there")


        signalRService.connection.on("ReceiveNotification", (message) => {
            console.log("Received notification:", message);
            showNotiAlert();
        });

        getUnreadNotificationCount().then((res) => {
            console.log("helo there")
            showNotiAlert();
            setUnreadNotification(res.unreadCount);
            console.log(res.unreadCount);
        });




    }, []);


    const showNotiAlert = () => {
        setIsVisible(true);
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3000);
    }


    return <nav className="home-top-nav z-10">
        <div className="left-section">
            <a href="#" className="logo-name">
                Bislerium Blogs
            </a>
        </div>

        {isVisible && (
            <div style={{ display: "flex", float: "right", marginRight: "140px" }} className="new-post-go-up">
                <svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "10px" }} width="14" height="14" fill="white" className="bi bi-bell" viewBox="0 0 16 16">
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                </svg>
                <div>
                    Notification Alert
                </div>
            </div>
        )}

        <div className="profile-container">
            <a href="/notification" className="notification-icon">
                <div className="notification-badge">
                    {unreadNotification}
                </div>

                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-bell" viewBox="0 0 16 16">
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                </svg>
            </a>



            <div className="dropdown" onClick={toggleDropdown}>
                <img className="profile-pic" src={User} alt="" />
                {isDropdownOpen && (

                    (getLocalStorageItem('token')) ? <div className="dropdown-content">
                        <a href="/profilepage">Profile</a>
                        <a href="#">Change Password</a>
                        <a href="#" style={{ color: "red" }} onClick={handleLogout} >Logout</a>
                    </div> : <div className="dropdown-content z-10">
                        <a href="/login">LogIn</a>
                        <a href="/register">Register</a>
                        {/* <a href="#" style={{ color: "red" }}>Logout</a> */}
                    </div>
                )
                }
            </div>
        </div>
    </nav>
}

export default NavBar;