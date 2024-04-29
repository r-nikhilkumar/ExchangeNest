import React from 'react';
import './Course.css';

export default function Course() {
  const courses = [
    {
      title: 'Course 1',
      description: 'Description of Course 1',
      image: 'https://source.unsplash.com/random/800x800/?stock',
      price: '$10',
    },
    {
      title: 'Course 2',
      description: 'Description of Course 2',
      image: 'https://source.unsplash.com/random/800x800/?stockmarket',
      price: '$20',
    },
    {
      title: 'Course 3',
      description: 'Description of Course 3',
      image: 'https://source.unsplash.com/random/800x800/?trading',
      price: '$30',
    },
    {
      title: 'Course 4',
      description: 'Description of Course 4',
      image: 'https://source.unsplash.com/random/800x800/?invest',
      price: '$40',
    },
    {
      title: 'Course 5',
      description: 'Description of Course 5',
      image: 'https://source.unsplash.com/random/800x800/?bitcoin',
      price: '$50',
    },
    {
      title: 'Course 6',
      description: 'Description of Course 6',
      image: 'https://source.unsplash.com/random/800x800/?business',
      price: '$60',
    },
  ];

  return (
    <div className="courses-container">
      <h2 className='text-center h2'>Popular Courses</h2>
      <div className="courses">
        {courses.map((course, index) => (
          <div key={index} className="course-card">
            <img src={course.image} alt={course.title} style={{ width: '100%', height: 'auto' }} />
            <div className="course-details">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p>Price: {course.price}</p>
              <button>Enroll Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
