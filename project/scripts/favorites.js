// --- LÓGICA PRINCIPAL DE LA PÁGINA DE FAVORITOS ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Capturamos los elementos clave del DOM
    const grid = document.getElementById('favoritesGrid');
    const emptyMessage = document.getElementById('emptyTeamMessage');
    const template = document.getElementById('favCardTemplate');
    const navBadge = document.getElementById('navBadge');

    // 2. Función principal que lee la memoria y dibuja la página
    function renderTeam() {
        // Leemos la memoria (si no hay nada, obtenemos un arreglo vacío)
        let myTeam = JSON.parse(localStorage.getItem('myPokeTeam')) || [];
        
        // Actualizamos el contador del menú en la parte superior
        if (navBadge) {
            navBadge.textContent = myTeam.length;
        }

        // Limpiamos la rejilla por si la estamos volviendo a dibujar
        grid.innerHTML = '';

        // 3. LA LÓGICA DEL ESTADO VACÍO
        if (myTeam.length === 0) {
            // Si no hay Pokémon, mostramos el mensaje triste y ocultamos la rejilla
            emptyMessage.style.display = 'block';
            grid.style.display = 'none';
            return; // Detenemos la función aquí
        } else {
            // Si hay Pokémon, ocultamos el mensaje y mostramos la rejilla
            emptyMessage.style.display = 'flex';
            grid.style.display = 'none'; // Asegúrate de usar 'grid' o 'flex' según tu CSS
        }

        // 4. DIBUJAR CADA POKÉMON GUARDADO
        myTeam.forEach(pokemon => {
            const clone = template.content.cloneNode(true);
            
            // Asignamos datos básicos
            clone.querySelector('.pokemonName').textContent = pokemon.name;
            clone.querySelector('.pokemonId').textContent = `#${pokemon.id.toString().padStart(3, '0')}`;
            
            // Asignamos la imagen guardada
            const img = clone.querySelector('.pokemonImg');
            img.src = pokemon.image;
            img.alt = pokemon.name;
            
            // Reconstruimos las etiquetas de los tipos (Ej: Fuego, Agua)
            const typeContainer = clone.querySelector('.pokemonTypes');
            const typesHtml = pokemon.types.map(t => 
                `<span class="typeBadge ${t.type.name}">${t.type.name}</span>`
            ).join('');
            typeContainer.innerHTML = typesHtml;

            // Le damos el color de fondo principal basado en su primer tipo
            const mainType = pokemon.types[0].type.name;
            clone.querySelector('.favCard').classList.add(`bg-${mainType}`);

            // 5. ¡LA MAGIA DEL BOTÓN "LIBERAR"!
            const releaseBtn = clone.querySelector('.releaseBtn');
            releaseBtn.addEventListener('click', () => {
                // Confirmamos que el usuario no le dio clic por accidente
                const confirmRelease = confirm(`Are you sure to release to ${pokemon.name}?`);
                
                if (confirmRelease) {
                    // Filtramos el arreglo para quedarnos con todos menos el que acabamos de borrar
                    myTeam = myTeam.filter(p => p.id !== pokemon.id);
                    
                    // Guardamos el nuevo arreglo actualizado en la memoria
                    localStorage.setItem('myPokeTeam', JSON.stringify(myTeam));
                    
                    // Volvemos a dibujar la pantalla para que desaparezca visualmente
                    renderTeam();
                }
            });

            grid.appendChild(clone);
        });
    }

    // Ejecutamos la función apenas cargue la página
    renderTeam();
});