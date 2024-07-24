import React from "react";
import "../style/leadsSideBar.css";
import { FaEnvelope, FaPhone } from "react-icons/fa";

const LeadsSideBar = ({ isOpen, onClose, users }) => {
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
                    <h2>Leads for Property</h2>
                    <ul className="user-list">
                        {users.map((user) => (
                            <div className="user-item-container">
                                <li key={user.email} className="user-item">
                                    <h3>{user.name}</h3>
                                    <p>Email: {user.email}</p>
                                    <p>Phone: {user.phoneNumber}</p>
                                </li>
                                <div className="user-actions">
                                    <a
                                        href={`mailto:${user.email}`}
                                        className="icon email-icon"
                                    >
                                        <FaEnvelope />
                                    </a>
                                    <a
                                        href={`tel:${user.phoneNumber}`}
                                        className="icon phone-icon"
                                    >
                                        <FaPhone />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default LeadsSideBar;
