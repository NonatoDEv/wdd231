let allPokemonNames = [];

async function fetchPokemonDictionary() {
    try {
        // limit=493 from Bulbasaur to Arceus
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=493');
        const data = await response.json();
        allPokemonNames = data.results.map(p => p.name);
    } catch (error) {
        console.error("Error,the dictionary can't load", error);
    }
}
export function initPokedex() {
    const form = document.getElementById('pokemonSearchForm');
    const input = document.getElementById('searchInput');
    const suggestionsBox = document.getElementById('suggestionsBox');
    const grid = document.getElementById('pokedexGrid');
    const template = document.getElementById('pokemonCardTemplate');
    const errorMsg = document.getElementById('searchError');

    if (!form || !grid || !template) return;

    // 1. loading the dictionary pokemon at the early stage to have it ready for the user
    fetchPokemonDictionary();

    // 2. autofill logic: hear the click and the input of the user to show suggestions
    input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query.length < 3) {
            suggestionsBox.style.display = 'none';
            return;
        }
        const matches = allPokemonNames.filter(name => name.startsWith(query));
        const topMatches = matches.slice(0, 5); // 5 suggestions max
        if (topMatches.length > 0) {
            suggestionsBox.innerHTML = topMatches.map(name => 
                `<li class="suggestionItem">${name}</li>`
            ).join('');
            suggestionsBox.style.display = 'block';
        } else {
            suggestionsBox.style.display = 'none';
        }
    });

    // 3. Select the suggestion and trigger the search
    suggestionsBox.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            input.value = e.target.textContent;
            suggestionsBox.style.display = 'none';
            form.dispatchEvent(new Event('submit')); // trigger the search immediately
        }
    });

    // 4. hidde suggestions if the user clicks outside of the input or suggestions box
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.autocompleteWrapper')) {
            suggestionsBox.style.display = 'none';
        }
    });

    // 5. search logic: hear the submit of the form, validate and fetch data from the API
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        suggestionsBox.style.display = 'none';
        
        const query = input.value.toLowerCase().trim();
        if (!query) return;

        // Validate: Block searches that are not numbers or valid names, and also block numbers > 493
        const isNumber = !isNaN(query);
        if (isNumber && parseInt(query) > 493) {
            grid.innerHTML = '';
            errorMsg.textContent = "only show pokemon from kanto to sinnoh (IDs 1-493).";
            errorMsg.style.display = 'block';
            return;
        }

        if (!isNumber && !allPokemonNames.includes(query)) {
            grid.innerHTML = '';
            errorMsg.textContent = " Pokemon not found in the 4 generations.";
            errorMsg.style.display = 'block';
            return;
        }

        // Si pasa validación, buscamos
        errorMsg.style.display = 'none';
        grid.innerHTML = '<p style="color: white; text-align: center;">Searching data...</p>';

        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
            if (!response.ok) throw new Error("Pokemon not found in the API.");

            const pokemonData = await response.json();
            renderCards([pokemonData], grid, template);

        } catch (error) {
            grid.innerHTML = '';
            errorMsg.textContent = "Error connection with the API.";
            errorMsg.style.display = 'block';
        }
    });
}

// draw the cards in the grid with the data of the pokemon
function renderCards(pokemons, grid, template) {
    grid.innerHTML = '';
    pokemons.forEach(pokemon => {
        const clone = template.content.cloneNode(true);
        clone.querySelector('.pokemonId').textContent = `#${pokemon.id.toString().padStart(3, '0')}`;
        clone.querySelector('.pokemonName').textContent = pokemon.name;
        
        // Optimize image loading: Convert PNG to WebP on the fly using a third-party service (wsrv.nl) for better performance
        const img = clone.querySelector('.pokemonImg');
        const originalPngUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
        
        // Usar WebP para navegadores compatibles, con fallback al PNG original
        img.src = `https://wsrv.nl/?url=${originalPngUrl}&output=webp`;
        img.alt = pokemon.name;
        
        img.onerror = function() {
            this.src = originalPngUrl; // Fallback al PNG original
        };

        // Render types(Fire, water, etc.) and card color based on the main type
        const typesContainer = clone.querySelector('.pokemonTypes');
        const mainType = pokemon.types[0].type.name;
        
        clone.querySelector('.pokemonCard').classList.add(`bg-${mainType}`);
        pokemon.types.forEach(typeInfo => {
            const span = document.createElement('span');
            span.classList.add('typeBadge', typeInfo.type.name);
            span.textContent = typeInfo.type.name;
            typesContainer.appendChild(span);
        });

        const cardElement = clone.querySelector('.pokemonCard');
        cardElement.addEventListener('click', () => {
            openPokemonModal(pokemon);
        });
        grid.appendChild(clone);
    });
}
//MODAL LOGIC
const statColors = {
    'hp': '#A7DB8D',
    'attack':  '#FF5959',
    'defense': '#4773da',
    'special-attack': '#F5AC78',
    'special-defense': '#9DB7F5',
    'speed': '#FA92B2'
};
//Function to open the modal with the details of the pokemon, including the stats bars and the top moves with their types
 async function openPokemonModal(pokemon) {
    const modal = document.getElementById('pokemonModal');
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
        <div class="loaderContainer">
            <div class="cssPokeball"></div>
            <p class="loadingText">Analizando datos de combate...</p>
        </div>
    `;
    modal.showModal();
   try {
        // 1. Build the stats bars HTML with dynamic colors and widths based on the base_stat value, using the statColors dictionary for colors
        const statsHtml = pokemon.stats.map(s => {
            const statNameRaw = s.stat.name;
            // Text formatting Convert:"special-attack" a "Sp. Atk", "defense" a "Def", etc.
            const statLabel = statNameRaw.replace('special-', 'Sp. ').replace('attack', 'Atk').replace('defense', 'Def');
            const percentage = Math.min((s.base_stat / 255) * 100, 100); 
            // Obtain the color of the dictionary (if not exist, use grease)
            const barColor = statColors[statNameRaw] || '#A8A878'; 
            
            return `
            <div class="statRow">
                <span class="statName">${statLabel}</span>
                <div class="statBarContainer">
                    <div class="statBar" style="width: ${percentage}%; background-color: ${barColor};"></div>
                </div>
                <span class="statValue">${s.base_stat}</span>
            </div>
            `;
        }).join('');

        //looking at the pokemon attacks and doing a fetch to each URL of the attack to obtain the type of it, then show it in the modal with the same style of the types in the card, but smaller and with a different class for example "moveItemBadge" to add some margin between them
        //Only takes 6 attacks to not overload the modal, you can change this number if you want to show more or less attacks
        const topMoves = pokemon.moves.slice(0, 6);
        
        //make fetches in parallel for better performance instead of doing them one by one, using Promise.all to wait for all the fetches to finish before rendering the modal content
        const movesData = await Promise.all(
            topMoves.map(async (m) => {
                const response = await fetch(m.move.url);
                return response.json();
            })
        );

        // 3. Builds HTML attacks with the type badge and the name of the attack, using the same colors as the types in the card, but with a smaller size and some margin between them
        const movesHtml = movesData.map(move => `
            <span class="typeBadge ${move.type.name} moveItemBadge">
                ${move.name.replace('-', ' ')}
            </span>
        `).join('');

        // 4. insert the stats and moves HTML into the modal body, along with the name of the pokemon as title, and some basic styling for better presentation
        modalBody.innerHTML = `
            <h3 style="text-transform: capitalize; text-align: center; font-size: 1.8rem; margin-bottom: 20px;">
                ${pokemon.name}
            </h3>
            
            <h4 style="color: var(--gray-medium); margin-bottom: 10px; font-size: 0.9rem; text-transform: uppercase;">Base Stats</h4>
            <div class="pokemonStats">
                ${statsHtml}
            </div>

            <h4 style="color: var(--gray-medium); margin-top: 24px; margin-bottom: 10px; font-size: 0.9rem; text-transform: uppercase;">Top Moves</h4>
            <div class="movesList">
                ${movesHtml}
            </div>
        `;
    } catch (error) {
        console.error("Error cargando los detalles del modal:", error);
        modalBody.innerHTML = '<p style="text-align:center; color: var(--charmander-red);">Error al cargar los datos de combate.</p>';
    }
}
//Configure the close button of the modal and also allow to close the modal if the user clicks outside of the box, using the native close() method of the dialog element for better performance and compatibility
document.addEventListener('DOMContentLoaded', () => {
    const closeModalBtn = document.getElementById('closeModalBtn');
    const pokemonModal = document.getElementById('pokemonModal');
    
    if (closeModalBtn && pokemonModal) {
        closeModalBtn.addEventListener('click', () => {
            pokemonModal.close(); //native function to close the dialog element
        });

        //Close the modal if the user clicks outside of the modal content, using the click event and checking if the click is outside of the modal dimensions
        pokemonModal.addEventListener('click', (e) => {
            const dialogDimensions = pokemonModal.getBoundingClientRect();
            if (
                e.clientX < dialogDimensions.left ||
                e.clientX > dialogDimensions.right ||
                e.clientY < dialogDimensions.top ||
                e.clientY > dialogDimensions.bottom
            ) {
                pokemonModal.close();
            }
        });
    }
});