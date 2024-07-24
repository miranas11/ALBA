import React, { useEffect, useState } from "react";
import "../style/home.css";
import background from "../assets/background.png";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import authController from "../controller/authController.js";
import Loading from "./utils/Loading.jsx";

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setIsLoading(false);
            return;
        }
        const validate = async () => {
            const response = await authController.validateToken();
            if (response.status === 201) navigate("/admin/home");
            setIsLoading(false);
        };
        validate();
    }, []);

    const handleLogin = () => {
        setShowLogin(true);
    };

    const handleAdmin = () => {
        setShowLogin(false);
    };
    if (isLoading) {
        return <Loading />;
    }
    return (
        <div className="home">
            <div className="header">
                <img src={background} alt="Background" className="background" />
                <div className="content-container">
                    {showLogin ? (
                        <Login handleAdmin={handleAdmin} />
                    ) : (
                        <Admin handleLogin={handleLogin} />
                    )}
                </div>
            </div>
        </div>
    );
};

const Login = ({ handleAdmin }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await authController.loginAdmin(email, password);
        if (response.status === 200) {
            navigate("/admin/home");
        } else {
            setError(response.data.message);
        }
    };

    return (
        <div className="login">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <h2>Log in to your account</h2>
            <p>Enter your credentials to log in!</p>
            <form onSubmit={handleSubmit}>
                {error && <p className="error">{error}</p>}
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="home-btn">
                    Next
                </button>
                <p className="create-account">
                    Don’t have an account?{" "}
                    <span onClick={handleAdmin} className="home-link">
                        Create an account
                    </span>
                </p>
            </form>
        </div>
    );
};

const Admin = ({ handleLogin }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await authController.registerAdmin(
            name,
            email,
            password
        );
        if (response.status === 201) {
            navigate("/admin/home");
        } else {
            setError(response.data.message);
        }
    };

    return (
        <div className="login">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <h2>Create Admin Account</h2>
            <p>Enter your credentials to signup</p>
            <form onSubmit={handleSubmit}>
                {error && <p className="error">{error}</p>}
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="home-btn">
                    Create Account
                </button>
                <p className="create-account">
                    Already have an account?{" "}
                    <span onClick={handleLogin} className="home-link">
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Home;
