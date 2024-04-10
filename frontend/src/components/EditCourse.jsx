import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditCoursePage = () => {
  const { id } = useParams('id');
  console.log("id from edit course",{id})
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    level: '',
    demoUrl: '',
    Capacity: '',
    WishListed: '',
    prerequisites: '',
    Event_Time: '',
    Event_Date: '',
    Event_Location: ''
  });
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    // Retrieve course details from localStorage
    const courseDetails = localStorage.getItem('editCourseDetails');
    console.log("course details got from localstorage",courseDetails)
    if (courseDetails) {
      setFormData(JSON.parse(courseDetails));
    } else {
      // If course details are not available in localStorage, redirect to a different page
      navigate('/courses');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem('accessToken');
  
      if (!accessToken) {
        setError('Access token not found. Please log in.');
        return;
      }
  
      const config = {
        headers: {
          'access_token': accessToken,
          'Content-Type': 'application/json' // Make sure to set the Content-Type header
        }
      };
  
      await axios.put(`http://localhost:8000/api/v1/edit-course/${formData._id}`, formData, config);
      console.log("formdata from edit course",formData._id)
      console.log('Course updated successfully');
      toast.success("Course updated successfully")
      navigate('/courses');
  
    //   // Refresh the events list after editing
    //   const response = await axios.get('http://localhost:8000/api/v1/get-all-events', {
    //     headers: {
    //       'access_token': accessToken
    //     }
    //   });
    //   setEvents(response.data.events);
    } catch (error) {
      console.error('Error updating course:', error.message);
      toast.error("Error updating course")
    }
  };
  

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
  <MDBRow>
    <MDBCol col='10' md='6'>
      <img src="https://th.bing.com/th/id/R.aa26b470321a97ab87a6994a449ef6ef?rik=nWuY9sSyUddoRA&riu=http%3a%2f%2fwww.evergreenworld.io%2fimg%2fxfaq-icon.png.pagespeed.ic.qia0cDIal6.png&ehk=bRl7XbMO0UG98mMZGmiD2cDAfEiAmM5yj6cZLMQE6ns%3d&risl=&pid=ImgRaw&r=0" />
    </MDBCol>
    <MDBCol col='4' md='6'>
      <MDBCard >
        <MDBCardBody>
          <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center justify-content-center">
            <h2 className="lead fw-normal mb-4">Edit Course</h2>
            <div className="mb-4">
              <label className="form-label">Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-4">
              <label className="form-label">Description:</label>
              <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-4">
              <label className="form-label">Price:</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-4">
              <label className="form-label">Level:</label>
              <input type="text" name="level" value={formData.level} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-4">
              <label className="form-label">Demo URL:</label>
              <input type="url" name="demoUrl" value={formData.demoUrl} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-4">
              <label className="form-label">Capacity:</label>
              <input type="number" name="Capacity" value={formData.Capacity} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-4">
              <label className="form-label">WishListed:</label>
              <input type="number" name="WishListed" value={formData.WishListed} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-4">
              <label className="form-label">Prerequisites:</label>
              <textarea name="prerequisites" value={formData.prerequisites} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-4">
              <label className="form-label">Event Time:</label>
              <input type="text" name="Event_Time" value={formData.Event_Time} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-4">
              <label className="form-label">Event Date:</label>
              <input type="date" name="Event_Date" value={formData.Event_Date} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-4">
              <label className="form-label">Event Location:</label>
              <input type="text" name="Event_Location" value={formData.Event_Location} onChange={handleChange} className="form-control" required />
            </div>
            <button type="submit" className="btn btn-primary btn-lg mb-3">Update Course</button>
          </form>
        </MDBCardBody>
      </MDBCard>
      {/* Display the list of events */}
      <div>
        <ul>
          {events.map(event => (
            <li key={event.id}>{event.name} - {event.Event_Date}</li>
          ))}
        </ul>
      </div>
    </MDBCol>
  </MDBRow>
</MDBContainer>


  );
};

export default EditCoursePage;
