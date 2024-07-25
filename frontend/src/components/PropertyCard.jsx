import React, { useEffect, useState } from "react";
import "../style/propertyCard.css";
import WarningModal from "./utils/WarningModal";
import propertyController from "../controller/propertyController";
import propertyImage_1 from "../assets/property_1.jpg";
import propertyImage_2 from "../assets/property_2.jpeg";
import propertyImage_3 from "../assets/property_3.jpg";

const PropertyCard = ({
    property,
    setProperties,
    onButtonClick,
    view,
    showEditForm,
    index,
}) => {
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const propertyImages = [propertyImage_1, propertyImage_2, propertyImage_3];

    const handleDelete = async () => {
        await propertyController.deleteProperty(property._id);
        setShowDeleteWarning(false);

        console.log(`Deleting property ${property._id}`);
        setProperties((prevProperties) =>
            prevProperties.filter((prop) => prop._id !== property._id)
        );
    };

    return (
        <div className="property-card" onClick={() => setMenuOpen(false)}>
            <div className="property-header">
                <div className="property-image">
                    <img src={propertyImages[index % 3]} alt="Property" />
                </div>
                {view === "admin" && (
                    <PropertyMenu
                        open={menuOpen}
                        toggleMenu={() => setMenuOpen(!menuOpen)}
                        onEdit={() => {
                            setMenuOpen(false);
                            showEditForm(property);
                        }}
                        onDelete={() => {
                            setMenuOpen(false);
                            setShowDeleteWarning(true);
                        }}
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
                {view === "admin" ? "Check Leads" : "Interested?"}
            </button>
        </div>
    );
};

export default PropertyCard;

const PropertyMenu = ({ open, toggleMenu, onEdit, onDelete }) => {
    return (
        <div className="property-menu">
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    toggleMenu();
                }}
                className="menu-button"
            >
                ⋮
            </button>
            {open && (
                <div
                    className="menu-options"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button onClick={onEdit}>Edit</button>
                    <button onClick={onDelete}>Delete</button>
                </div>
            )}
        </div>
    );
};
