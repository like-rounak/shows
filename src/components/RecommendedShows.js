// src/components/RecommendedShows.js
import React, { useEffect, useState } from 'react';
import { fetchRecommendedEvents } from '../services/eventService';
import './RecommendedShows.css';

const RecommendedShows = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getEvents = async () => {
            try {
                const data = await fetchRecommendedEvents();
                console.log('Recommended Events:', data);
                setEvents(data.events || []);
            } catch (err) {
                console.error('Error fetching recommended events:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getEvents();
    }, []);

    const getIframeUrl = (url) => {
        const fileId = url.match(/d\/(.*?)\//)?.[1];
        return `https://drive.google.com/file/d/${fileId}/preview`;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="recommended-shows">
            <h2>Recommended Shows</h2>
            <div className="events-container">
                {events.map(event => {
                    const distanceKm = parseFloat(event.distanceKm);
                    const iframeUrl = getIframeUrl(event.imgUrl);
                    return (
                        <div key={event.eventName} className="event-card">
                            <iframe 
                                src={iframeUrl} 
                                className="event-image" 
                                allow="autoplay"
                                style={{ pointerEvents: 'none' }}
                                frameBorder="0"
                            />
                            <div className="event-details">
                                <h3 className="event-title">{event.eventName}</h3>
                                <div className="event-location-date">
                                    <span className="event-location">{event.cityName}</span>
                                    <span className="event-date">{new Date(event.date).toLocaleDateString()}</span>
                                </div>
                                <div className="event-weather-distance">
                                    <span>{event.weather}</span>
                                    <span>{distanceKm.toFixed(0)} Km</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RecommendedShows;
