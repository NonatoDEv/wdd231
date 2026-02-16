import { initGyms } from '../data/gyms.mjs';

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('gymsGrid')) {
        initGyms();
    }
});