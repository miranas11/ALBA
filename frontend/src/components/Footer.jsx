import React from "react";
import "../style/footer.css";
import logo from "../assets/logo_golden.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTwitter,
    faLinkedin,
    faInstagram,
    faFacebook,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <img src={logo} alt="Alba Corp" className="footer-logo" />
                    <p>
                        Leading the way in transforming industries through
                        AI-driven innovations and the potential of diversity.
                    </p>
                </div>
                <div className="footer-section">
                    <h4>Companies</h4>
                    <ul>
                        <li>
                            <a href="#">Alba Cars</a>
                        </li>
                        <li>
                            <a href="#">Alba Homes</a>
                        </li>
                        <li>
                            <a href="#">Alba Innovation Hub</a>
                        </li>
                        <li>
                            <a href="#">Alba Jobs</a>
                        </li>
                        <li>
                            <a href="#">Instacuts</a>
                        </li>
                        <li>
                            <a href="#">Ravo</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>About Alba Corp</h4>
                    <ul>
                        <li>
                            <a href="#">Home</a>
                        </li>
                        <li>
                            <a href="#">Who We Are</a>
                        </li>
                        <li>
                            <a href="#">Investors</a>
                        </li>
                        <li>
                            <a href="#">Careers</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Newsroom</h4>
                    <ul>
                        <li>
                            <a href="#">Press Release</a>
                        </li>
                        <li>
                            <a href="#">Brand Kit</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-section contact-section">
                    <h4>Get In Touch!</h4>
                    <p>Need help? 24/7</p>
                    <p>
                        <a href="tel:+971582340982">+971 58 234 0982</a>
                    </p>
                    <p>
                        <a href="mailto:info@albacorp.net">info@albacorp.net</a>
                    </p>
                    <div className="social-media">
                        <a href="#">
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                        <a href="#">
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                        <a href="#">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <a href="#">
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                    </div>
                    <p>Al Fattan Business Hub, JBR, Marina, Dubai, UAE</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2024 Alba Corporation. All Rights Reserved.</p>
                <ul>
                    <li>
                        <a href="#">Privacy Policies</a>
                    </li>
                    <li>
                        <a href="#">Data Policies</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
