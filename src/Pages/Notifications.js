import React, { useEffect, useState } from 'react'
import NavBar from '../Components/NavBar';
import SideBar from '../Components/SideBar';
import NotificationCard from '../Components/notification_card';
import { getAllNotification } from "../services/NotificationServices";

const NotificationPage = () => {
  const [notifications, setNotification] = useState([])


  useEffect(() => {
    getAllNotification().then((res) => {
      console.log("🚀 ~ getAllNotification ~ res:", res)
      setNotification(res);
      console.log(res);
    });


  }, []);


  return (
    <div>
      <NavBar />
      <SideBar />
      <div className='content'>
        <center><h1 className='noti-i'>Notifications</h1></center>
        {notifications &&
          notifications.map((notification) => {
            return <NotificationCard name={notification.notificationMessage} />;
          })}


      </div>
    </div>
  )
}

export default NotificationPage;