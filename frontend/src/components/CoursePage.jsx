import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './coursePage.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for redirection
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CourseListEnroll() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const [wishlistClickedMap, setWishlistClickedMap] = useState({});
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false); // State to store whether the user is an admin
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user details from the API endpoint
        const accessToken = localStorage.getItem('accessToken');
        const meResponse = await axios.get('http://localhost:8000/api/v1/me', {
          headers: {
            'access_token': accessToken
          }
        });

        // Check if the user is an admin
        if (meResponse.data.user && meResponse.data.user.role === 'admin') {
          setIsAdmin(true);
        }

        // Fetch courses data
        const coursesResponse = await axios.get('http://localhost:8000/api/v1/get-all-courses', {
          headers: {
            'access_token': accessToken
          }
        });
        console.log("response from course page", coursesResponse.data.courses)
        setCourses(coursesResponse.data.courses);
        // Extract and set the wishlist count from the response
        setWishlistCount(coursesResponse.data.wishlistCount);
      } catch (error) {
        setError('Failed to fetch data. Please Login');
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        setError('Please log in to enroll.');
        toast.warning("Please log in to enroll.")
        return;
      }
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'access_token': accessToken
        }
      };
  
      const data = { courseId };
      await axios.post('http://localhost:8000/api/v1/create-order', data, config);
  
      // Update the capacity in the UI by decrementing it by 1
      const updatedCourses = courses.map(course => {
        if (course._id === courseId && course.Capacity > 0) {
          return {
            ...course,
            Capacity: course.Capacity - 1
          };
        }
        return course;
      });
      setCourses(updatedCourses);
  
      console.log('Enrolled successfully');
      toast.success("Enrolled successfully")
      
    }
      // Handle success, e.g., show a success message
    // } catch (error) {
    //   setError('Failed to enroll. Please try again later.');
    //   console.error('Error enrolling:', error.message);
    //   toast.warning("You have already purchased this Course")
    // }
    catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = extractErrorMessage(error.response.data);
        if (errorMessage.startsWith('You')) {
          toast.warning('You have already purchased this Course');
        } else {
          setError('Failed to enroll. Please try again later.');
          console.error('Error enrolling:', errorMessage);
          toast.success("Check Mail for Order Confirmation");
        }
      } else if (error.response && error.response.status === 500) {
        console.log("token error",extractErrorMessage(error.response.data))
        if (extractErrorMessage(error.response.data) === 'Unknown error') {
          toast.error('Your session has expired. Please log in again.');
          // Handle token expiration as needed
        } else {
          setError('Failed to enroll. Please try again later.');
          console.error('Error enrolling:', error.message);
          toast.success("Check Mail for Order Confirmation");
        }
      } else {
        setError('Failed to enroll. Please try again later.');
        console.error('Error enrolling:', error.message);
        toast.success("Check Mail for Order Confirmation");
      }
    }
    
    
    function extractErrorMessage(htmlString) {
      const match = /<pre>Error:\s*([\s\S]*?)<\/pre>/i.exec(htmlString);
      const errorMessage = match ? match[1].replace(/<br\s*\/?>/g, ' ') : 'Unknown error';
      return errorMessage.trim();
    }
    
    function extractErrorMessage(htmlString) {
      const match = /<pre>Error:\s*([\s\S]*?)<\/pre>/i.exec(htmlString);
      const errorMessage = match ? match[1].replace(/<br\s*\/?>/g, ' ') : 'Unknown error';
      return errorMessage.trim();
    }
    
    
    function extractErrorMessage(htmlString) {
      const match = /<pre>Error:\s*([\s\S]*?)<\/pre>/i.exec(htmlString);
      return match ? match[1].trim() : 'Unknown error';
    }
    
    
    
  };
  
  const handleWishlistClick = async (courseId) => {
    try {
      // Call the API to add to wishlist only if the button hasn't been clicked before for this course
      if (!wishlistClickedMap[courseId]) {
        // Update the state to indicate that the button has been clicked for this course
        setWishlistClickedMap(prevState => ({
          ...prevState,
          [courseId]: true,
        }));
        setWishlistCount(prevCount => prevCount + 1);
        
        // Call the API to add to wishlist
        // Example: await axios.post('http://localhost:8000/api/v1/add-to-wishlist', { courseId });
        console.log('Added to wishlist successfully');
        toast.success("Added to wishlist successfully")
      }
    } catch (error) {
      setError('Failed to add to wishlist. Please try again later.');
      console.error('Error adding to wishlist:', error.message);
      toast.warning("Error adding to wishlist")
    }
  };

  const handleEditClick = (courseId, courseDetails) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        setError('Please log in to edit.');
        return;
      }
  
      // Check if courseDetails is provided and it's an object
      if (courseDetails && typeof courseDetails === 'object') {
        // Save the course details in localStorage
        localStorage.setItem('editCourseDetails', JSON.stringify(courseDetails));
        // Redirect to the edit page
        navigate(`/edit-event`);
      } else {
        setError('Failed to save course details. Please try again later.');
      }
    } catch (error) {
      setError('Failed to perform the operation. Please try again later.');
      console.error('Error performing operation:', error.message);
      toast.error("Error performing operation")
    }
  };
  
  
  
  return (
    <div className='card-element'>
      <h1>All Events</h1>
      <br></br>
      <div className='card-container'>
        {courses.map(course => (
          <div key={course._id} className='card-wrapper'>
            <Card className='card-body' style={{ width: '25rem' }}>
              <Card.Body>
                <Card.Title><h2>{course.name}</h2></Card.Title>
                <Card.Text>
                  <p><strong>Description:</strong> {course.description}</p>
                  <p><strong>Price:</strong> {course.price}</p>
                  <p><strong>Level:</strong> {course.level}</p>
                  <p><strong>Prerequisites:</strong> {course.prerequisites.join(', ')}</p>
                  <p ><strong>Demo URL:</strong> <a style={{textDecoration:"none"}} href={course.demoUrl} target="_blank" rel="noopener noreferrer">{course.demoUrl}</a></p>
                  <p><strong>Capacity:</strong> {course.Capacity}</p>
                  <p><strong>WishListed:</strong> {course.WishListed}</p>
                  <p><strong>Event Date:</strong> {course.Event_Date}</p>
                  <p><strong>Event Time:</strong> {course.Event_Time}</p>
                  <p><strong>Event Location:</strong> {course.Event_Location}</p>
                </Card.Text>
                <Button className='coursebutton' variant="primary" onClick={() => handleEnroll(course._id)} disabled={course.Capacity === 0}>Enroll</Button>
                <Button className='coursebutton' variant="primary" onClick={() => handleWishlistClick(course._id)} disabled={wishlistClickedMap[course._id]}>Add to Wishlist</Button>
                <Button className='coursebutton' variant="primary" onClick={() => handleEditClick(course._id, course)}>Edit</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      {<h3 style={{"display":'flex',"justifyContent":"center","letterSpacing":"3px","wordSpacing":"20px"
      ,"marginTop":"200px","marginLeft":"50px"}}>{error}</h3>}
    </div>
  );
}  

export default CourseListEnroll;
