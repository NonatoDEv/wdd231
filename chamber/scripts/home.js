import { initWeather } from './weather.js';
import { initSpotlights } from './spotlights.js';
// import { initEvents } from './events.js';

document.addEventListener('DOMContentLoaded', () => {
    initWeather();
    initSpotlights();
    /*initEvents();*/
});