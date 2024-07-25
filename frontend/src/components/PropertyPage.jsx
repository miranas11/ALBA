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
import Footer from "./Footer.jsx";

const PropertyPage = ({ view }) => {
    const { user, updateUser } = useContext(MyContext);
    const [properties, setProperties] = useState([]);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showIntrestedForm, setShowIntrestedForm] = useState(false);
    const [leadsData, setLeadsData] = useState();

    const [showDialogue, setShowDialogue] = useState({
        value: false,
        message: null,
    });

    const handleCreateProperty = () => {
        setShowForm(!showForm);
    };
    const handleEditSubmit = async (data) => {
        const response = await propertyController.editProperty(
            data,
            selectedProperty._id
        );
        console.log(response);
        setShowEditForm(false);
        setShowDialogue({ value: true, message: "Property Edited " });
        setTimeout(() => {
            setShowDialogue({ value: false, message: null });
        }, 2000);
    };

    const handleFormSubmit = async (data) => {
        console.log("000");
        const response = await propertyController.createProperty(data);
        console.log("100");

        if (response.data === 11000) {
            setShowDialogue({ value: true, message: "Property Already Exist" });
            setTimeout(() => {
                setShowDialogue({ value: false, message: null });
            }, 2000);

            return;
        }
        console.log(200);
        console.log(response.newProperty);

        setProperties((prevProperties) => [
            ...prevProperties,
            response.newProperty,
        ]);
        console.log(300);
        setShowDialogue({ value: true, message: "Property Created" });
        setTimeout(() => {
            setShowDialogue({ value: false, message: null });
        }, 2000);

        setShowForm(false);
    };
    const onIntrestedButtonClick = async (propertyId) => {
        if (user) {
            await propertyController.addLead(propertyId, user._id);
            setShowDialogue({ value: true, message: "Interest Shown" });
            setTimeout(() => {
                setShowDialogue({ value: false, message: null });
            }, 2000);
            return;
        }
        setSelectedProperty(propertyId);
        setShowIntrestedForm(true);
    };

    const handleIntrestedFormSubmit = async (data) => {
        const userdata = await authController.saveUser(data);
        await propertyController.addLead(selectedProperty, userdata.data._id);
        updateUser(userdata.data);
        setShowIntrestedForm(false);
        setShowDialogue({ value: true, message: "Interest Shown" });
        setTimeout(() => {
            setShowDialogue({ value: false, message: null });
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
        const fetchProperties = async () => {
            const response = await propertyController.getAllProperties();

            setProperties(response);
        };

        fetchProperties();
    }, [properties]);

    return (
        <div>
            <Navbar view={view} userName="Mir Anas" />
            <div className="timeline-container">
                <img
                    src={timelineImage}
                    alt="Timeline"
                    className="timeline-image"
                />
                <div className="timeline-overlay">
                    <h1>Discover your ideal property in Dubai.</h1>
                    <p>
                        Explore our diverse selection of residences, including
                        apartments, villas, duplexes, and more,
                        <br />
                        ready for you to find your perfect home!
                    </p>
                </div>
            </div>
            <div className="property-list">
                <div className="property-list-navbar">
                    {view === "admin" ? (
                        <h1>"Properties"</h1>
                    ) : (
                        <div className="propertylist-text">
                            <h1>Find you perfect property in Dubai.</h1>
                            <p>
                                Explore our exceptional range of residences,
                                including apartments, villas, duplexes, and
                                more, ready for you to uncover.
                            </p>
                        </div>
                    )}

                    {/* <h1>
                        {view === "admin"
                            ? "Properties"
                            : "Find Your Perfect Property"}
                    </h1> */}
                    {view === "admin" && (
                        <button
                            className="create-property"
                            onClick={handleCreateProperty}
                        >
                            {showForm ? "Close Form" : "Post Property"}
                        </button>
                    )}
                </div>
                <div className="property-cards">
                    {properties.map((property, index) => {
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
                                showEditForm={(data) => {
                                    setShowEditForm(true);
                                    setSelectedProperty(data);
                                }}
                                view={view}
                                index={index}
                            />
                        );
                    })}
                </div>
            </div>
            {showEditForm && (
                <CreatePropertyForm
                    form={"edit"}
                    onSubmit={handleEditSubmit}
                    onClose={() => {
                        setShowEditForm(false);
                    }}
                    editProperty={selectedProperty}
                    // setProperties={setProperties}
                />
            )}
            {showForm && (
                <CreatePropertyForm
                    form="create"
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
            {showDialogue.value && (
                <div className="dialogue">{showDialogue.message}</div>
            )}
            {view !== "admin" && <Footer />}
        </div>
    );
};

export default PropertyPage;
