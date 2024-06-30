import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar-left">
                <div className="logo">BookUsNow</div>
                <div className="location">Mumbai, India</div>
            </div>
            <div className="navbar-center">
                <input type="text" className="search-bar" placeholder="Search" />
                <div className="categories">Categories</div>
            </div>
            <div className="navbar-right">
                <div className="favorites">Favorites</div>
                <div className="sign-in">Sign In</div>
            </div>
            <div className="navbar-bottom">
                <div className="menu-item">Live Shows</div>
                <div className="menu-item">Streams</div>
                <div className="menu-item">Movies</div>
                <div className="menu-item">Plays</div>
                <div className="menu-item">Events</div>
                <div className="menu-item">Sports</div>
                <div className="menu-item">Activities</div>
            </div>
        </div>
    );
};

export default Navbar;
