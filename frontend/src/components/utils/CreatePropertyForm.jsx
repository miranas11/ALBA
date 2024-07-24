import React, { useState } from "react";
import "../../style/createPropertyForm.css";

const CreatePropertyForm = ({ onSubmit, onClose, setProperties }) => {
    const [community, setCommunity] = useState("");
    const [building, setBuilding] = useState("");
    const [unitNo, setUnitNo] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!community || !building || !unitNo) {
            setError("All fields are required");
            return;
        }

        if (isNaN(unitNo)) {
            setError("Unit No. must be a number");
            return;
        }

        setError("");
        onSubmit({ community, building, unitNo });
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
                <form onSubmit={handleSubmit}>
                    {error && <p className="error">{error}</p>}
                    <div className="form-group">
                        <label>Community</label>
                        <select
                            value={community}
                            onChange={(e) => setCommunity(e.target.value)}
                        >
                            <option value="">Select Community</option>
                            <option value="CommunityA">CommunityA</option>
                            <option value="CommunityB">CommunityB</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Building</label>
                        <select
                            value={building}
                            onChange={(e) => setBuilding(e.target.value)}
                        >
                            <option value="">Select Building</option>
                            <option value="BuildingA">BuildingA</option>
                            <option value="BuildingB">BuildingB</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Unit No.</label>
                        <input
                            type="text"
                            value={unitNo}
                            onChange={(e) => setUnitNo(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="create-btn">
                        Post Property
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePropertyForm;
