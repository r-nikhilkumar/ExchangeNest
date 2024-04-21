import React from "react";
import "./CountCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CountCard = ({ count, label, icon }) => {
  return (
    <div className="count-card">
      <div className="icon">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="count">{count}</div>
      <div className="label">{label}</div>
    </div>
  );
};

export default CountCard;
