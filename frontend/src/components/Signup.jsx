// SignUpForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import './signup.css';
import { Toast } from 'react-bootstrap';

function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


const handleSignUp = async (e) => {
  e.preventDefault();

  try {
    // Make the signup request
    const response = await axios.post('http://localhost:8000/api/v1/registration', formData);
    // Redirect to OTP verification page
    console.log(response)
    console.log(response.data.activationToken)
    navigate('/verify', { state: { activationToken: response.data.activationToken } });
    // Show success toast
    toast.success('Signup successful! Redirecting to verification page...');
  } catch (error) {
    // alert('Signup failed:', error.message);
    toast.error('Signup failed:', error.message);
    // Check if the error message indicates that the email already exists
    if (error.response && error.response.data && error.response.data.message === 'Email already exist') {
      // Show toast indicating that the email already exists
      toast.error('Email already exists. Please use a different email.');
    } else {
      // Show generic error toast for other errors
      toast.error('Signup failed. Please try again later.');
    }
  }
};

  

  return (
    <div className='formbody'>
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <MDBRow>
        <MDBCol col='6' md='6'>
          <img  src="https://cdni.iconscout.com/illustration/premium/thumb/disaster-recovery-4468754-3748877.png" />
        </MDBCol>
        
        <MDBCol col='6' md='6'>
          <form onSubmit={handleSignUp}>
          <div className="d-flex flex-row align-items-center justify-content-center">
              <p className="lead fw-normal mb-0 me-3">Sign Up</p>
              
            </div>
            <MDBInput
              className='mb-4'
              placeholder='Name'
              id='nameInput'
              type='text'
              size="lg"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <MDBInput
              className='mb-4'
              placeholder='Email address'
              id='emailInput'
              type='email'
              size="lg"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            
            <MDBInput
              className='mb-4'
              placeholder='Password'
              id='passwordInput'
              type='password'
              size="lg"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <MDBBtn style={{maxWidth: '170px', maxHeight: '50px', minWidth: '120px', minHeight: '50px'}}type="submit" className="mb-0 px-5 button" size='lg' >Sign up</MDBBtn>
            <div class="text-center text-lg-start mt-4 pt-2">
            <p class="small fw-bold mt-2 pt-1 mb-0">Already an User? <a href="http://localhost:3000/login"
                class="link-danger">LogIn</a></p>
          </div>
          </form>
          
          </MDBCol>
      </MDBRow>
    </MDBContainer>
    </div>
  );
}

export default SignupForm;



