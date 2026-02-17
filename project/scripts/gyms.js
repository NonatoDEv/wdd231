import { updateNavBadge } from '../data/badge.mjs';
import { initGyms } from '../data/gyms.mjs';


document.addEventListener('DOMContentLoaded', () => {
    updateNavBadge
    if (document.getElementById('gymsGrid')) {
        initGyms();
    }
});