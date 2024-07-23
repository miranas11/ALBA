import React from "react";
import "../style/leadsSideBar.css";

const LeadsSideBar = ({ isOpen, onClose }) => {
    return (
        <>
            <div
                className={`backdrop ${isOpen ? "open" : ""}`}
                onClick={onClose}
            ></div>
            <div className={`sidebar ${isOpen ? "open" : ""}`}>
                <div className="sidebar-content">
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                    {/* Add your sidebar content here */}
                    <h2>Leads for Property</h2>
                    <p>Details about leads go here.</p>
                </div>
            </div>
        </>
    );
};

export default LeadsSideBar;
