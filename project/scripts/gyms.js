import { initHeader } from '../data/header.mjs';
import { renderFooter } from '../data/footer.mjs';
import { initGyms } from '../data/gyms.mjs';

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    renderFooter();
    if (document.getElementById('gymsGrid')) {
        initGyms();
    }
});