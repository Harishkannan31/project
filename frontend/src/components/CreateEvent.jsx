import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
// import { fetchAllUsers, sendEmailToAllUsers } from './MailForEventCreation';
// import '../../../servercode/utils/sendMail';
// import sendMail from '../../node_modules/sendMail';
import './createEvent.css';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EventForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    level: '',
    demoUrl: '',
    Capacity:'',
    WishListed:'',
    prerequisites: '',
    Event_Time: '',
    Event_Date: '',
    Event_Location: ''
  });

  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [events, setEvents] = useState([]); // State to store events
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            
          setError('Please log in to create an event.');
        //   toast.error("Please log in to create an event.")
          return;
        }

        const meResponse = await axios.get('http://localhost:8000/api/v1/me', {
          headers: {
            'access_token': accessToken
          }
        });
        
        if (meResponse.data.user) {
          const user = meResponse.data.user;
          setIsAdmin(user.role === 'admin');
        } else {
          setError('You are not authenticated. Please log in to create an event.');
          toast.warning("You are not authenticated. Please log in to create an event.")
        }
      } catch (error) {
        setError('Failed to fetch user data. Please try again later.');
        toast.error("Failed to fetch user data. Please Login")
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleCreateEvent = () => {
    // Redirect to courses page
    navigate('/courses');
  };

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
        toast.warning("Access token not found. Please log in.")
        return;
      }
  
      const config = {
        headers: {
          'access_token': accessToken
        }
      };
  
      await axios.post('http://localhost:8000/api/v1/create-course', formData, config);
  
      console.log('Event created successfully');
      toast.success("Event created successfully")
  
      // Add the created event to the list of events
      setEvents([...events, formData]);
  
      // Clear the form data
      setFormData({
        name: '',
        description: '',
        price: '',
        level: '',
        demoUrl: '',
        Capacity:'',
        WishListed:'',
        prerequisites: '',
        Event_Time: '',
        Event_Date: '',
        Event_Location: ''
      });
  
      // Call handleCreateEvent after successfully submitting the form
      handleCreateEvent();
      // Send email to all users about the new event
    // await sendEmailToAllUsers(); // Assuming this function is accessible here
    } catch (error) {
      console.error('Error creating event:', error.message);
      toast.error("Error creating event")
    }
  };
  


  // Render the EventForm only if the user is an admin
  if (!isAdmin) {
    
    return <h3 style={{"display":'flex',"justifyContent":"center","letterSpacing":"3px","wordSpacing":"20px"
    ,"marginTop":"250px","marginLeft":"50px"}}>You are not authorized to create an event.
                    Login to Access This Page</h3>;
  }

  return (
    <>
    
    <MDBContainer fluid>
        
    <MDBRow>
      {/* <MDBCol col='10' md='6'>
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
      </MDBCol> */}
      
      <MDBCol col='20' md='20'>
        <MDBCard className="custom-card">
          <MDBCardBody>
            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center justify-content-center">
              <h2 className="lead fw-normal mb-4">Create New Event</h2>
              <MDBInput
                label='Name:'
                id='name'
                type='text'
                size="lg"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <MDBInput
                label='Description:'
                id='description'
                type='textarea'
                size="lg"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
              <MDBInput
                label='Price:'
                id='price'
                type='number'
                size="lg"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
              <MDBInput
                label='Level:'
                id='level'
                type='text'
                size="lg"
                name="level"
                value={formData.level}
                onChange={handleChange}
                required
              />
              
              <MDBInput
                label='Demo URL:'
                id='demoUrl'
                type='url'
                size="lg"
                name="demoUrl"
                value={formData.demoUrl}
                onChange={handleChange}
                required
              />
              <MDBInput
                label='Capacity:'
                id='capacity'
                type='number'
                size="lg"
                name="Capacity"
                value={formData.Capacity}
                onChange={handleChange}
                required
              />
              <MDBInput
                label='WishListed:'
                id='wishListed'
                type='number'
                size="lg"
                name="WishListed"
                value={formData.WishListed}
                onChange={handleChange}
                required
              />
              <MDBInput
                label='Prerequisites:'
                id='prerequisites'
                type='textarea'
                size="lg"
                name="prerequisites"
                value={formData.prerequisites}
                onChange={handleChange}
                required
              />
              <MDBInput
                label='Event Time:'
                id='eventTime'
                type='text'
                size="lg"
                name="Event_Time"
                value={formData.Event_Time}
                onChange={handleChange}
                required
              />
              <MDBInput
                label='Event Date:'
                id='eventDate'
                type='date'
                size="lg"
                name="Event_Date"
                value={formData.Event_Date}
                onChange={handleChange}
                required
              />
              <MDBInput
                label='Event Location:'
                id='eventLocation'
                type='text'
                size="lg"
                name="Event_Location"
                value={formData.Event_Location}
                onChange={handleChange}
                required
              />
              <MDBBtn type="submit" className="btn btn-primary btn-lg mb-3">Create Event</MDBBtn>
              
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
  </>
  );
};

export default EventForm;
