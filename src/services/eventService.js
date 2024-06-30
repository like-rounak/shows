// src/services/eventService.js
import axios from 'axios';

const RECOMMENDED_EVENTS_URL = 'https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&type=reco';
const UPCOMING_EVENTS_URL = 'https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&page=';

export const fetchRecommendedEvents = async () => {
    const response = await axios.get(RECOMMENDED_EVENTS_URL);
    return response.data;
};

export const fetchUpcomingEvents = async (page) => {
    const response = await axios.get(`${UPCOMING_EVENTS_URL}${page}&type=upcoming`);
    return response.data;
};
