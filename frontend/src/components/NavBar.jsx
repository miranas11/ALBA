import React, { useContext, useEffect, useState } from "react";
import "../style/navbar.css";
import userIcon from "../assets/usericon.webp";
import logo from "../assets/logo.png";
import MyContext from "../MyContext";
import Cookies from "js-cookie";

const Navbar = ({ view }) => {
    const { user } = useContext(MyContext);
    const [showName, setShowName] = useState(false);
    const [adminName, setAdminName] = useState("");
    const logout = () => {
        localStorage.removeItem("token");
        Cookies.remove("adminData");
        window.location.href = "/admin";
    };
    useEffect(() => {
        if (view == "admin") {
            const adminData = Cookies.get("adminData");
            if (adminData) {
                const parsedData = JSON.parse(adminData);
                setAdminName(parsedData.name);
            }
        }
        if (user && view == "user") {
            setShowName(true);
        }
    }, [user]);

    return (
        <div>
            <nav className="navbar">
                <div className="navbar-left">
                    <img src={logo} alt="Logo" className="logo" />
                </div>
                {view === "admin" && (
                    <div className="navbar-right">
                        <span className="logout" onClick={logout}>
                            Logout{" "}
                        </span>
                        <span className="user-name">{adminName}</span>
                        <img
                            src={userIcon}
                            alt="User Icon"
                            className="user-icon"
                        />
                    </div>
                )}
                {showName && (
                    <div className="navbar-right">
                        <span className="user-name">{user.name}</span>
                        <img
                            src={userIcon}
                            alt="User Icon"
                            className="user-icon"
                        />
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbar;
