import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple, faGoogle, faMicrosoft, faFacebook, faTwitter, faAmazon } from '@fortawesome/free-brands-svg-icons';
import './CompanyIcons.css'; // Import custom CSS for styling

const CompanyIcons = ({onClick}) => {
  const handleIconClick = (company) => {
    onClick(company);
  };

  const handleMoreButtonClick = () => {
    alert('More button clicked');
  };

  return (
    <div className="company-icons-container h-fit">
      <div className="company-icon" onClick={() => handleIconClick('AAPL')}>
        <FontAwesomeIcon icon={faApple} className="icon" />
        <span className="company-name">Apple</span>
      </div>
      <div className="company-icon" onClick={() => handleIconClick('GOOGL')}>
        <FontAwesomeIcon icon={faGoogle} className="icon" />
        <span className="company-name">Google</span>
      </div>
      <div className="company-icon" onClick={() => handleIconClick('MSFT')}>
        <FontAwesomeIcon icon={faMicrosoft} className="icon" />
        <span className="company-name">Microsoft</span>
      </div>
      <div className="company-icon" onClick={() => handleIconClick('META')}>
        <FontAwesomeIcon icon={faFacebook} className="icon" />
        <span className="company-name">Facebook</span>
      </div>
      <div className="company-icon" onClick={() => handleIconClick('TWTR')}>
        <FontAwesomeIcon icon={faTwitter} className="icon" />
        <span className="company-name">Twitter</span>
      </div>
      <div className="company-icon" onClick={() => handleIconClick('Amazon')}>
        <FontAwesomeIcon icon={faAmazon} className="icon" />
        <span className="company-name">Amazon</span>
      </div>
      <button className="more-button" onClick={handleMoreButtonClick}>More</button>
    </div>
  );
};

export default CompanyIcons;
