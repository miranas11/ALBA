import React, { useState, useEffect } from "react";
import "../style/propertyPage.css";
import propertyController from "../controller/propertyController.js";
import PropertyCard from "./PropertyCard.jsx";
import Navbar from "./NavBar.jsx";
import CreatePropertyForm from "./CreatePropertyForm.jsx";
import timelineImage from "../assets/background_1.jpg";
import LeadsSideBar from "./LeadsSideBar.jsx";

const PropertyPage = () => {
    const [properties, setProperties] = useState([]);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const handleCreateProperty = () => {
        setShowForm(!showForm);
    };

    const handleFormSubmit = async (data) => {
        console.log("Form submitted:", data);
        const response = await propertyController.createProperty(data);

        setProperties((prevProperties) => [
            ...prevProperties,
            response.newProperty,
        ]);

        console.log(response);
        setShowForm(false);
    };

    const leadsSideBarOpen = (leadsData) => {
        setSidebarOpen(true);
        console.log(leadsData);
    };

    const leadsSideBarClose = () => {
        setSidebarOpen(false);
    };

    useEffect(() => {
        const fetchProperties = async () => {
            const response = await propertyController.getAllProperties();

            console.log(response);
            setProperties(response);
        };

        fetchProperties();
    }, []);

    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>{error}</div>;

    return (
        <div>
            <Navbar userName="Mir Anas" />
            <img
                src={timelineImage}
                alt="Timeline"
                className="timeline-image"
            />
            <div className="property-list">
                <div className="property-list-navbar">
                    <h1>Properties</h1>
                    <button
                        className="create-property"
                        onClick={handleCreateProperty}
                    >
                        {showForm ? "Close Form" : "Create Property"}
                    </button>
                </div>
                <div className="property-cards">
                    {properties.map((property) => {
                        return (
                            <PropertyCard
                                key={property._id}
                                property={property}
                                setProperties={setProperties}
                                openSideBar={leadsSideBarOpen}
                            />
                        );
                    })}
                </div>
            </div>
            {showForm && (
                <CreatePropertyForm
                    onSubmit={handleFormSubmit}
                    onClose={() => {
                        setShowForm(false);
                    }}
                    setProperties={setProperties}
                />
            )}
            {isSidebarOpen && (
                <LeadsSideBar
                    isOpen={isSidebarOpen}
                    onClose={leadsSideBarClose}
                />
            )}
        </div>
    );
};

export default PropertyPage;
