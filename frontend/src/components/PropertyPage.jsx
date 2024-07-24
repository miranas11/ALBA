import React, { useState, useEffect, useContext } from "react";
import "../style/propertyPage.css";
import propertyController from "../controller/propertyController.js";
import PropertyCard from "./PropertyCard.jsx";
import Navbar from "./NavBar.jsx";
import CreatePropertyForm from "./utils/CreatePropertyForm.jsx";
import timelineImage from "../assets/background_1.jpg";
import LeadsSideBar from "./LeadsSideBar.jsx";
import CreateIntrestedForm from "./utils/CreateIntrestedForm.jsx";
import authController from "../controller/authController.js";
import MyContext from "../MyContext.jsx";

const PropertyPage = ({ view }) => {
    const { user, updateUser } = useContext(MyContext);
    const [properties, setProperties] = useState([]);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [showIntrestedForm, setShowIntrestedForm] = useState(false);
    const [leadsData, setLeadsData] = useState();
    const [showDialogue, setShowDialogue] = useState(false);

    const handleCreateProperty = () => {
        setShowForm(!showForm);
    };

    const handleFormSubmit = async (data) => {
        const response = await propertyController.createProperty(data);

        setProperties((prevProperties) => [
            ...prevProperties,
            response.newProperty,
        ]);

        setShowForm(false);
    };
    const onIntrestedButtonClick = async (propertyId) => {
        if (user) {
            console.log("pd", propertyId);
            console.log(user);
            await propertyController.addLead(propertyId, user._id);
            setShowDialogue(true);
            setTimeout(() => {
                setShowDialogue(false);
            }, 2000);
            return;
        }
        setSelectedProperty(propertyId);
        setShowIntrestedForm(true);
    };

    const handleIntrestedFormSubmit = async (data) => {
        const userdata = await authController.saveUser(data);
        const response = await propertyController.addLead(
            selectedProperty,
            userdata.data._id
        );
        updateUser(userdata.data);
        setShowIntrestedForm(false);
        setShowDialogue(true);
        setTimeout(() => {
            setShowDialogue(false);
        }, 2000);
    };

    const leadsSideBarOpen = (leadsData) => {
        setSidebarOpen(true);
        setLeadsData(leadsData);
    };

    const leadsSideBarClose = () => {
        setSidebarOpen(false);
    };

    useEffect(() => {
        console.log(user);
        const fetchProperties = async () => {
            const response = await propertyController.getAllProperties();

            setProperties(response);
        };

        fetchProperties();
    }, []);

    return (
        <div>
            <Navbar view={view} userName="Mir Anas" />
            <img
                src={timelineImage}
                alt="Timeline"
                className="timeline-image"
            />
            <div className="property-list">
                <div className="property-list-navbar">
                    <h1>Properties</h1>
                    {view === "admin" && (
                        <button
                            className="create-property"
                            onClick={handleCreateProperty}
                        >
                            {showForm ? "Close Form" : "Create New"}
                        </button>
                    )}
                </div>
                <div className="property-cards">
                    {properties.map((property) => {
                        return (
                            <PropertyCard
                                key={property._id}
                                property={property}
                                setProperties={setProperties}
                                onButtonClick={
                                    view === "admin"
                                        ? leadsSideBarOpen
                                        : onIntrestedButtonClick
                                }
                                view={view}
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
            {showIntrestedForm && (
                <CreateIntrestedForm
                    onSubmit={handleIntrestedFormSubmit}
                    onClose={() => setShowIntrestedForm(false)}
                />
            )}
            {isSidebarOpen && (
                <LeadsSideBar
                    users={leadsData}
                    isOpen={isSidebarOpen}
                    onClose={leadsSideBarClose}
                />
            )}
            {showDialogue && <div className="dialogue">Interest shown</div>}
        </div>
    );
};

export default PropertyPage;
