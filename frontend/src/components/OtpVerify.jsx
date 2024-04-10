import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import './signup.css';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';

function OTPVerification() { 
  const location = useLocation();
  const data = location.state;
  console.log(data)

  const navigate = useNavigate(); 
  const [activation_code, setActivationCode] = useState('');

  const handleChange = (e) => {
    setActivationCode(e.target.value);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    // console.log("activationToken inside handleVerifyOTP:", activationToken);
    console.log("data from signup",data)
     // Log the request object
  const requestData = {
    activation_code: activation_code,
    activation_token: data.activationToken
  };
  console.log("Request being sent:", requestData);

    try {
      // Verify OTP with the access token
      const accessToken = localStorage.getItem('accessToken');

// Verify OTP with the access token
const response = await axios.post('http://localhost:8000/api/v1/activate-user', requestData, {
  headers: {
    'access_token': accessToken
  }
});
      // Handle OTP verification response
      console.log("from otp js try",response.data);
      navigate('/login');
    } catch (error) {
        
      console.error('OTP verification failed:', error.message);
    }
  };

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <MDBRow>
        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
        </MDBCol>
        <MDBCol col='4' md='6'>
          <form onSubmit={handleVerifyOTP}>
            <MDBInput
              wrapperClass='mb-4'
              label='Enter OTP'
              id='otpInput'
              type='text'
              size="lg"
              value={activation_code}
              onChange={handleChange}
              required
            />
            <MDBBtn type="submit" className="mb-0 px-5 button" size='lg'>Verify OTP</MDBBtn>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default OTPVerification;
