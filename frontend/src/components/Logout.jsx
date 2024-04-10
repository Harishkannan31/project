import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogoutButton = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      // Get the access token from localStorage
      const accessToken = localStorage.getItem('accessToken');

      // Check if access token exists
      if (!accessToken) {
        // Handle case where access token is not found
        console.error('Access token not found');
        return;
      }

      // Send request to logout API endpoint with access token in headers
      await axios.get('http://localhost:8000/api/v1/logout', {
        headers: {
          'access_token': accessToken
        }
      });

      // Clear access token from localStorage
      localStorage.removeItem('accessToken');

      // Navigate to login page
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  // Perform logout action immediately when component renders
  logout();

  return (
    <div style={{"display":'flex',"justifyContent":"center","letterSpacing":"7px","wordSpacing":"20px"
    ,"marginTop":"300px","fontWeight":"bolder","font-size":"50px"}}>
      {/* You can optionally render a message here to indicate that the user is being logged out */}
      <h3>Logged Out Successfully!!..🙃</h3>
    </div>
  );
};

export default LogoutButton;
