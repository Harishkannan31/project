import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './coursePage.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function MyEvents() {
  const [myEnrolledCourses, setMyEnrolledCourses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyEnrolledCourses = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          setError('Please log in to view your courses.');
          return;
        }

        const myCoursesResponse = await axios.get('http://localhost:8000/api/v1/me', {
          headers: {
            'access_token': accessToken
          }
        });

        // Extract enrolled courses from the response
        const enrolledCourses = myCoursesResponse.data.user.courses;

        // Fetch course details for the enrolled course IDs
        const coursesResponse = await axios.get('http://localhost:8000/api/v1/get-all-courses', {
          headers: {
            'access_token': accessToken
          }
        });

        // Filter courses based on enrolled course IDs
        const myCourses = coursesResponse.data.courses.filter(course => {
          return enrolledCourses.some(enrolledCourse => enrolledCourse._id === course._id);
        });

        setMyEnrolledCourses(myCourses);
      } catch (error) {
        setError('Failed to fetch your courses. Please try again later.');
        console.error('Error fetching my courses:', error.message);
      }
    };

    fetchMyEnrolledCourses();
  }, []);

  return (
    <div className='card-element'>
      <h1>My Events</h1>
      <br></br>
      <div className='card-container'>
        {myEnrolledCourses.map(course => (
          <div key={course._id} className='card-wrapper'>
            <Card className='card-body' style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>{course.name}</Card.Title>
                <Card.Text>
                  <p>Description: {course.description}</p>
                  <p>Price: {course.price}</p>
                  <p>Level: {course.level}</p>
                  <p>Prerequisites: {course.prerequisites.join(', ')}</p>
                  <p>Demo URL: <a href={course.demoUrl} target="_blank" rel="noopener noreferrer">{course.demoUrl}</a></p>
                  <p>Event Date: {course.Event_Date}</p>
                  <p>Event Time: {course.Event_Time}</p>
                  <p>Event Location: {course.Event_Location}</p>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      {error && <p>{error}</p>}
    </div>
  );
}

export default MyEvents;
