import React from 'react';
import '../CSS/GemAdminHome.css';

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="gem-admin-modal">
      <div className="gem-admin-modal-content">
        <p>{message}</p>
        <div className="gem-admin-modal-buttons">
          <button onClick={onConfirm}>Confirm</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
