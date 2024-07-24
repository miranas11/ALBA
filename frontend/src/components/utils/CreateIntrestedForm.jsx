import React, { useState } from "react";
import "../../style/createPropertyForm.css";

const CreateIntrestedForm = ({ onSubmit, onClose }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !phoneNumber) {
            setError("All fields are required");
            return;
        }

        if (isNaN(phoneNumber)) {
            setError("Phone number must be a number");
            return;
        }

        setError("");
        onSubmit({ name, email, phoneNumber });
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal" onClick={handleBackdropClick}>
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>
                    ×
                </button>
                <h2>Enter your Details to Express Intrest in this Property</h2>
                <form onSubmit={handleSubmit}>
                    {error && <p className="error">{error}</p>}
                    <div className="form-group">
                        <label>Your Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your Name"
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Your Phone Number"
                        />
                    </div>
                    <div className="form-group checkbox-group">
                        <input type="checkbox" id="contact-checkbox" />
                        <label htmlFor="contact-checkbox">
                            I wish to be contacted by dealers
                        </label>
                    </div>

                    <button type="submit" className="create-btn">
                        Continue
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateIntrestedForm;
