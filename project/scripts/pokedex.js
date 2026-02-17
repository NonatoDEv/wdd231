import { initHeader } from '../data/header.mjs';
import { updateNavBadge } from '../data/badge.mjs';
import { initPokedex } from '../data/pokedex.mjs';
import { renderFooter } from '../data/footer.mjs';

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    updateNavBadge();
    initPokedex();
    renderFooter();
    
});