import React, { useState, useEffect } from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import LogoutButton from './Logout';

const Sidebar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [userDataFetched, setUserDataFetched] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          console.error('Access token not found');
          return;
        }

        const response = await axios.get('http://localhost:8000/api/v1/me', {
          headers: {
            'access_token': accessToken
          }
        });

        if (response.data.user) {
          const userRole = response.data.user.role;
          setIsAdmin(userRole === 'admin');
        } else {
          console.error('User data not found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      } finally {
        setUserDataFetched(true); // Set userDataFetched to true after fetching user data
      }
    };

    fetchUserData();
  }, []);

  // Render sidebar content only if user data has been fetched
  if (!userDataFetched) {
    return null; // You can render a loader here if needed
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh'}}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Learny
          </a>
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/create-event" activeClassName="activeClicked">
             <CDBSidebarMenuItem icon="columns">Create Event</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/courses" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">All Events</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Profile Info</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/order" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">My Event</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/signup" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">SignUp/LogIn</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/logout" activeClassName="activeClicked" onClick={() => LogoutButton}>
              <CDBSidebarMenuItem icon="user">LogOut</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div style={{ padding: '20px 5px' }}></div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
