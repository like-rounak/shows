import React from 'react';
import './App.css';
import RecommendedShows from './components/RecommendedShows';
import UpcomingEvents from './components/UpcomingEvents';
import Navbar from './components/Nav';
function App() {
    return (
        <div className="App">
            <Navbar />
            {/* <header className="App-header">
                <h1>BookUsNow</h1>
            </header> */}
            <div className="banner">
                <div className="banner-text">
                    <h2>Discover Exciting Events Happening Near You – Stay Tuned for Updates!</h2>
                </div>
            </div>
            <RecommendedShows />
            <UpcomingEvents />
        </div>
    );
}

export default App;
