import React from "react";
import "../../style/warningModal.css"; // Assuming you have a CSS file for styling

const WarningModal = ({ onConfirm, onCancel }) => {
    return (
        <div className="modal" onClick={onCancel}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onCancel}>
                    ×
                </button>
                <p>Are you sure you want to delete this property?</p>
                <button className="warn-btn confirm" onClick={onConfirm}>
                    Yes, Delete
                </button>
                <button className="warn-btn cancel" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default WarningModal;
