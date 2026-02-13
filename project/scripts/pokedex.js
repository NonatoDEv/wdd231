import { initHeader } from '../data/header.mjs';
import { renderFooter } from '../data/footer.mjs';
import { initPokedex } from '../data/pokedex.mjs';

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    renderFooter();
    if (document.getElementById('pokedexGrid')) {
        initPokedex();
    }
});