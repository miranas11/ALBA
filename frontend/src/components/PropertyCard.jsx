import React, { useState } from "react";
import "../style/propertyCard.css";
import WarningModal from "./utils/WarningModal";
import propertyController from "../controller/propertyController";

const PropertyCard = ({
    property,
    setProperties,
    onButtonClick,
    view,
    showEditForm,
}) => {
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);

    const handleDelete = async () => {
        await propertyController.deleteProperty(property._id);
        setShowDeleteWarning(false);

        console.log(`Deleting property ${property._id}`);
        setProperties((prevProperties) =>
            prevProperties.filter((prop) => prop._id !== property._id)
        );
    };

    return (
        <div className="property-card">
            <div className="property-header">
                <div className="property-image">
                    <img
                        src="https://via.placeholder.com/300x200"
                        alt="Property"
                    />
                </div>
                {view === "admin" && (
                    <PropertyMenu
                        onEdit={() => showEditForm(property)}
                        onDelete={() => setShowDeleteWarning(true)}
                    />
                )}
            </div>

            <div className="property-details">
                <h2>{property.unitNo}</h2>
                <p>{property.community}</p>
                <p>{property.building}</p>
            </div>

            {showDeleteWarning && (
                <WarningModal
                    onConfirm={handleDelete}
                    onCancel={() => setShowDeleteWarning(false)}
                />
            )}
            <button
                className="check-leads-button"
                onClick={
                    view === "admin"
                        ? () => {
                              onButtonClick(property.leads);
                          }
                        : () => {
                              onButtonClick(property._id);
                          }
                }
            >
                {view === "admin" ? "Check Leads" : "Intrested?"}
            </button>
        </div>
    );
};

export default PropertyCard;

const PropertyMenu = ({ onEdit, onDelete }) => {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => {
        setOpen(!open);
    };

    return (
        <div className="property-menu">
            <button onClick={toggleMenu} className="menu-button">
                ⋮
            </button>
            {open && (
                <div className="menu-options">
                    <button onClick={onEdit}>Edit</button>
                    <button onClick={onDelete}>Delete</button>
                </div>
            )}
        </div>
    );
};
