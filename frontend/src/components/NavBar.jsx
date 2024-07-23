import React from "react";
import "../style/navbar.css";
import userIcon from "../assets/usericon.webp";
import logo from "../assets/logo.png";

const Navbar = ({ userName }) => {
    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    return (
        <div>
            <nav className="navbar">
                <div className="navbar-left">
                    <img src={logo} alt="Logo" className="logo" />
                </div>
                <div className="navbar-right">
                    <span className="logout" onClick={logout}>
                        Logout{" "}
                    </span>
                    <span className="user-name">{userName}</span>
                    <img src={userIcon} alt="User Icon" className="user-icon" />
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
