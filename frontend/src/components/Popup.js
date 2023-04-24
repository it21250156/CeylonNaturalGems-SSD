import React from "react";
import '../CSS/GemAdmin.css';

const Popup = ({ message, onClose }) => {
  return (
    <div className="popup">
      <div className="popup-container">
        <p className="popup-message">{message}</p>
        <button className="popup-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
