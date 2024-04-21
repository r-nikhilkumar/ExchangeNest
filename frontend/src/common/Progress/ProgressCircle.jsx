import React from 'react';
import './ProgressCircle.css'; // Import CSS for styling

const ProgressCircle = ({ percentage }) => {
  return (
    <div className="spinner">
      <div className="progress" style={{ transform: `rotate(${percentage * 3.6}deg)` }}></div>
    </div>
  );
};

export default ProgressCircle;
