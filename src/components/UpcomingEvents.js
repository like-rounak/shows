import React, { useEffect, useState } from 'react';
import { fetchUpcomingEvents } from '../services/eventService';
import './UpcomingEvents.css';

const UpcomingEvents = () => {
    const [events, setEvents] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(5);

    useEffect(() => {
        const getEvents = async () => {
            setLoading(true);
            try {
                const data = await fetchUpcomingEvents(page);
                console.log(`Page ${page} events:`, data.events);
                setEvents(prevEvents => [...prevEvents, ...data.events]);
                setTotalPages(data.totalPages || 5);
            } catch (err) {
                console.error('Error fetching upcoming events:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getEvents();
    }, [page]);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        if (page < totalPages) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const getDirectImageUrl = (url) => {
        const fileId = url.match(/d\/(.*?)\//)?.[1];
        return `https://drive.google.com/file/d/${fileId}/preview`;
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [page, totalPages]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="upcoming-events">
            <h2>Upcoming Events</h2>
            <div className="events-container">
                {events.map(event => {
                    const distanceKm = parseFloat(event.distanceKm);
                    const imageUrl = getDirectImageUrl(event.imgUrl);
                    return (
                        <div key={event.eventName} className="event-card">
                            <div className="iframe-container">
                                <iframe src={imageUrl} width="100%" height="150" allow="autoplay"></iframe>
                                <div className="iframe-overlay"></div>
                            </div>
                            <h3>{event.eventName}</h3>
                            <p>{event.cityName}</p>
                            <p>{new Date(event.date).toLocaleDateString()}</p>
                            <p>{event.weather}</p>
                            <p>{distanceKm.toFixed(2)} Km</p>
                        </div>
                    );
                })}
            </div>
            {loading && <div className="loading-spinner">Loading...</div>}
        </div>

        
    );
};

export default UpcomingEvents;
