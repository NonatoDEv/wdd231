// URL base de la API
const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';

export async function initPokedex() {
    const grid = document.getElementById('pokedexGrid');
    const template = document.getElementById('pokemonCardTemplate');

    // Validación de seguridad
    if (!grid || !template) return;

    try {
        // 1. Traer la lista de Pokémon
        const response = await fetch(API_URL);
        const data = await response.json();
        
        // 2. Por cada Pokémon, necesitamos sus detalles (foto, tipos)
        // Usamos Promise.all para que sea súper rápido (paralelo)
        const detailedPokemons = await Promise.all(
            data.results.map(async (pokemon) => {
                const res = await fetch(pokemon.url);
                return res.json();
            })
        );

        // 3. Renderizar usando el Template
        renderCards(detailedPokemons, grid, template);

    } catch (error) {
        console.error("Error atrapando Pokémones:", error);
        grid.innerHTML = `<p style="color:white; text-align:center;">Hubo un error cargando la Pokedex. Intenta más tarde.</p>`;
    }
}

function renderCards(pokemons, grid, template) {
    // Limpiamos la rejilla por si acaso
    grid.innerHTML = '';

    pokemons.forEach(pokemon => {
        // A. Clonar el template (true significa clonar hijos también)
        const clone = template.content.cloneNode(true);

        // B. Rellenar los datos en el clon
        clone.querySelector('.pokemonId').textContent = `#${pokemon.id.toString().padStart(3, '0')}`;
        clone.querySelector('.pokemonName').textContent = pokemon.name;
        
        const img = clone.querySelector('.pokemonImg');
        img.src = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
        img.alt = pokemon.name;

        // C. Manejar los tipos (puede tener 1 o 2)
        const typesContainer = clone.querySelector('.pokemonTypes');
        pokemon.types.forEach(typeInfo => {
            const span = document.createElement('span');
            span.classList.add('typeBadge', typeInfo.type.name); // Añade clase 'fire', 'water', etc.
            span.textContent = typeInfo.type.name;
            // Opcional: Asignar color directo si no tienes CSS para cada tipo aún
            // span.style.backgroundColor = getTypeColor(typeInfo.type.name); 
            typesContainer.appendChild(span);
        });

        // D. Inyectar el clon en la rejilla
        grid.appendChild(clone);
    });
}