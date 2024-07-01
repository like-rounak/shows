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

    const getDirectImageUrl = (url) => {
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
                    const imageUrl = getDirectImageUrl(event.imgUrl);
                    return (
                        <div key={event.eventName} className="event-card">
                            <iframe src={imageUrl} width="200" height="200" allow="autoplay" className="iframe-non-interactive"></iframe>
                            <h3>{event.eventName}</h3>
                            <p>{event.cityName}</p>
                            <p>{new Date(event.date).toLocaleDateString()}</p>
                            <p>{event.weather}</p>
                            <p>{distanceKm.toFixed(2)} Km</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RecommendedShows;
