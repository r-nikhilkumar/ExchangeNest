import React, { useState, useEffect } from 'react';

function AdvertisementSidebar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 830);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className={`fixed ${isMobile ? 'bottom-0 left-0 right-0' : 'w-60 top-40 right-auto'} bg-white border border-gray-200 rounded-t-lg shadow-lg p-2 flex items-center justify-between`}>
          <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-full mr-2">
            {/* You can put your ad image or content here */}
            <img src="https://i.pinimg.com/originals/d4/c6/f0/d4c6f064fff4d921b875086401bf32b6.jpg" alt="" className="h-12 mx-auto object-cover rounded-full w-12" />
          </div>
          <div className="flex-grow">
            <h2 className="text-sm font-semibold text-gray-800">Ad Title</h2>
            <p className="text-xs text-gray-600">Ad description lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <a href="#" className="text-blue-500 text-xs hover:underline">Learn more</a>
          </div>
          {isMobile && (
            <button onClick={handleClose} className="text-blue-500 hover:text-blue-600 focus:outline-none">
              &#10005;
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default AdvertisementSidebar;
