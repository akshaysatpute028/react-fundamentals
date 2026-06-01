import React from 'react'
import '../App.css';
import { FaCss3Alt, FaReact } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="app-footer">
            <p>
                © 2026 Learn React - Master React Fundamentals | Built for Beginners
            </p>
            <p className="footer-tech">
                Built with
                <FaReact className="react-icon" />
                React and styled with
                <FaCss3Alt className="css-icon" />
                CSS
            </p>
        </footer>
    )
}

export default Footer