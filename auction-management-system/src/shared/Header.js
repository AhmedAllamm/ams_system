import React from "react";
import '../style/Header.css';
import image from '../assets/images/logo.png';

const Header = () =>
{
    return (
        <header className="main-header">
        <div className="logo">
        <img src={image} alt="logo"/>

        </div>
        <nav>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Contact Us</li>
            </ul>
        </nav>
        </header>

    ); 
        
    
};

export default Header;