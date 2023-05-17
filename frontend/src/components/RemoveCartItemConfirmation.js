import React from 'react';

const RemoveCartItemConfirmation = ({ message, onConFirm, onCancel }) => {
  return (
    <>
      <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-body">
          {message}
          <div class="mt-2 pt-2 border-top">
            <button
              type="button"
              class="btn btn-primary btn-sm"
              onClick={onConFirm}
            >
              Take action
            </button>
            <button
              onClick={onCancel}
              type="button"
              class="btn btn-secondary btn-sm"
              data-bs-dismiss="toast"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RemoveCartItemConfirmation;
