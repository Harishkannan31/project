import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import './signup.css';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate(); // Get the navigate function from the hook

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/v1/login', formData);
      const { accessToken, user } = response.data;
      if (accessToken && user.role === 'admin' || 'user') {
        // Save the access token in local storage
        localStorage.setItem('accessToken', accessToken);
        // Navigate to the course page if the user is an admin
        navigate('/courses');
      } else {
        console.log('User is not an admin');
      }
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };
  

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <MDBRow>
        <MDBCol col='6' md='6'>
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/online-account-registration-8809865-7150992.png" />
        </MDBCol>
        <MDBCol col='6' md='6'>
          <form onSubmit={handleLogin}>
            <div className="d-flex flex-row align-items-center justify-content-center">
              <p className="lead fw-normal mb-0 me-3">Log In</p>
            </div>
            <MDBInput
              wrapperClass='mb-4'
              label='Email address'
              id='emailInput'
              type='email'
              size="lg"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <MDBInput
              wrapperClass='mb-4'
              label='Password'
              id='passwordInput'
              type='password'
              size="lg"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <MDBBtn type="submit" className="mb-0 px-5 button" size='lg' style={{maxWidth: '100px', maxHeight: '50px', minWidth: '150px', minHeight: '50px'}}>Login</MDBBtn>
            <div className="text-center text-lg-start mt-4 pt-2">
            <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="http://localhost:3000/Signup"
                className="link-danger">Register</a></p>
          </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default LoginForm;
