//App.js
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate
import SignupForm from './components/Signup';
import OTPVerification from './components/OtpVerify';
import LoginForm from './components/Login';
import CourseListEnroll from './components/CoursePage';
// import NavScrollExample from './components/HomePage';
import Sidebar from './components/SideBar';
import EventForm from './components/CreateEvent';
import MyEvents from './components/MyEvents';
import EditCoursePage from './components/EditCourse';
import ProfilePage from './components/ProfileInfo';
import HomePage from './components/LandingPage';
import LogoutButton from './components/Logout';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [activationToken, setActivationToken] = useState('');

  const handleSignUp = async (formData) => {
    try {
      // Make the signup request
      const response = await axios.post('http://localhost:8000/api/v1/registration', formData);
      // Extract the access token from the response
      console.log("from app js",response.data)
      const { activationToken } = response.data;
      setActivationToken(activationToken);

    } catch (error) {
      toast.error("Signup failed")
      console.error('Signup failed:', error.message);
    }
  };

  return (
    <BrowserRouter>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flexGrow: 1, padding: '10px' }}>
          <Routes>
          <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupForm handleSignUp={handleSignUp} />} />
            <Route path="/verify" element={<OTPVerification activationToken={activationToken} />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/courses" element={<CourseListEnroll />} />
            <Route path="/create-event" element={<EventForm />} />
            <Route path="/order" element={<MyEvents />} />
            <Route path="/edit-event" element={<EditCoursePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/logout" element={<LogoutButton />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;






