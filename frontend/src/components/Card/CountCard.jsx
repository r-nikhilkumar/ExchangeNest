import React from "react";
import "./CountCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CountCard = ({ count, label, icon }) => {
  const truncatedCount = Math.floor(count * 10) / 10;
  return (
    <div className="count-card">
      <div className="icon">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="count">{truncatedCount}</div>
      <div className="label">{label}</div>
    </div>
  );
};

export default CountCard;
