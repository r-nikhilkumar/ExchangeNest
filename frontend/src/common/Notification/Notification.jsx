import React, { useState, useEffect } from 'react';
import "./Notification.css"

const Notification = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      // Show notification for 5 seconds
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      // Clear timeout when component unmounts or message changes
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className={`notification ${type}${isVisible ? ' visible' : ''}`}>
      {message}
    </div>
  );
};

export const handleNotification = (message, type, setNotification) => {
    setNotification({message, type});
      setTimeout(() => {
        setNotification(null);
      }, 3000);
}

export default Notification;
