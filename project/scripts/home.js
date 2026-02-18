import { initHeader } from '../data/header.mjs';
import { updateNavBadge } from '../data/badge.mjs';
import { initWeather } from '../data/weather.mjs';
import { renderFooter } from '../data/footer.mjs';

//feautured Pokémon to show in the carousel, can be changed to any valid Pokémon name or ID from the API
const featuredPokemonNames = ['pikachu', 'charizard', 'gengar', 'lucario', 'umbreon'];

async function renderFeaturedCarousel() {
    const carouselTrack = document.getElementById('featuredCarousel');
    const template = document.getElementById('carouselCardTemplate');
    
    if (!carouselTrack || !template) return;

    try {
        const featuredData = await Promise.all(
            featuredPokemonNames.map(async (name) => {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
                if (!response.ok) throw new Error('Error fetching Pokémon');
                return response.json();
            })
        );

        featuredData.forEach(pokemon => {
            const clone = template.content.cloneNode(true);
            
            clone.querySelector('.pokemonId').textContent = `#${pokemon.id.toString().padStart(3, '0')}`;
            clone.querySelector('.pokemonName').textContent = pokemon.name;
            
            const img = clone.querySelector('.pokemonImg');
            const originalPngUrl = pokemon.sprites.other['official-artwork'].front_default;
            
            img.src = `https://wsrv.nl/?url=${originalPngUrl}&output=webp`;
            img.alt = pokemon.name;
            
            img.onerror = function() {
                this.src = originalPngUrl; 
            };

            const typeContainer = clone.querySelector('.pokemonTypes');
            const typesHtml = pokemon.types.map(t => 
                `<span class="typeBadge ${t.type.name}">${t.type.name}</span>`
            ).join('');
            typeContainer.innerHTML = typesHtml;

            const mainType = pokemon.types[0].type.name;
            clone.querySelector('.pokemonCard').classList.add(`bg-${mainType}`);

            carouselTrack.appendChild(clone);
        });

    } catch (error) {
        console.error("Error cargando el carrusel:", error);
        carouselTrack.innerHTML = `<div class="carouselErrorBox"><p class="carouselErrorText">Error loading featured Pokémon.</p></div>`;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await initHeader();
    updateNavBadge();
    await renderFeaturedCarousel();
    initWeather();
    renderFooter();
});