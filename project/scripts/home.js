import { initHeader } from '../data/header.mjs';
import { updateNavBadge } from '../data/badge.mjs';
import { renderFooter } from '../data/footer.mjs';

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    updateNavBadge();
    renderFooter();
});