import React, { useContext, useEffect, useState } from "react";
import "../style/navbar.css";
import userIcon from "../assets/usericon.webp";
import logo from "../assets/logo.png";
import MyContext from "../MyContext";

const Navbar = ({ view, userName }) => {
    const { user } = useContext(MyContext);
    const [showName, setShowName] = useState(false);
    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/admin";
    };
    useEffect(() => {
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
                        <span className="user-name">{userName}</span>
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
