import { initHeader } from '../data/header.mjs';
import { updateNavBadge } from '../data/badge.mjs';
import { renderFooter } from '../data/footer.mjs';

//pokemon list for the featured carousel, we can change it to any pokemon we want, but these are some of the most popular ones that people would like to see on the home page
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
            
            clone.querySelector('.pokemonName').textContent = pokemon.name;
            clone.querySelector('.pokemonId').textContent = `#${pokemon.id.toString().padStart(3, '0')}`;
            
            //convert png to webp for better performance, if not available, fallback to png
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
            carouselTrack.appendChild(clone);
        });

    } catch (error) {
        console.error("Error loading featured Pokémon:", error);
        carouselTrack.innerHTML = `
            <div class="carouselErrorBox">
                <p class="carouselErrorText">Error loading featured Pokémon. The PC's doctor Oaks might be sleeping.</p>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', async() => {
    await initHeader();
    updateNavBadge();
    renderFeaturedCarousel();
    renderFooter();
});