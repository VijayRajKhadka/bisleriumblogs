import React, { Component } from 'react'
import TopNav from '../Components/top_nav';
import SideBar from '../Components/SideBar';
import NotificationCard from '../Components/notification_card';

const NotificationPage =()=> {
    return (
      <div>
        <TopNav/>
        <SideBar/>
        <div className='content'>
        <center><h1 className='noti-i'>Notifications</h1></center>

                <NotificationCard name="Sirish" type="upvoted" />
                
                <NotificationCard name="Vijay" type="downvoted" />

                <NotificationCard name="Johnone" type="upvoted" />

                <NotificationCard name="Sirish" type="posted" />

                <NotificationCard name="Sirish" type="upvoted" />

                <NotificationCard name="Sirish" type="comented" />
                <NotificationCard name="Sirish" type="upvoted" />
                <NotificationCard name="Sirish" type="upvoted" />
                <NotificationCard name="Sirish" type="upvoted" />


        </div>
      </div>
    )
  }

  export default NotificationPage;