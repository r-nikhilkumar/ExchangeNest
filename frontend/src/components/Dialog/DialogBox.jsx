import React from "react";
import "./DialogBox.css";

function DialogBox({ children, show, setShow }) {
  return (
    show && (
      <div className="dialog-overlay">
        <div className="dialog-container">
          <button className="close-button" onClick={() => setShow(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-x"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div className="dialog-content">
            {/* Content of the dialog */}
            {children}
            {/* You can add more components here */}
          </div>
        </div>
      </div>
    )
  );
}

export default DialogBox;
