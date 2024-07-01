import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h2>BookUsNow</h2>
            </div>
            <ul className="navbar-menu">
                <li>Categories</li>
                <li>Live Shows</li>
                <li>Streams</li>
                <li>Movies</li>
                <li>Plays</li>
                <li>Events</li>
                <li>Sports</li>
                <li>Activities</li>
            </ul>
            <div className="navbar-actions">
                <input type="text" placeholder="Search" />
                <button>Favorites</button>
                <button>Sign In</button>
            </div>
        </nav>
    );
}

export default Navbar;
