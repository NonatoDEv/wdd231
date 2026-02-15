// Our local JSON 
let gymsDatabase = {};

export async function initGyms() {
    const grid = document.getElementById('gymsGrid');
    const template = document.getElementById('gymCardTemplate');
    const filterButtons = document.querySelectorAll('.regionBtn');
    // Check if the necessary elements exist before proceeding
    if (!grid || !template) return;
    try {
        const response = await fetch('./data/gyms.json');
        gymsDatabase = await response.json();
        renderGyms('kanto');
    } catch (error) {
        console.error("Loding error with the database of gyms:", error);
    }
    //Events for the filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            // Draw the gyms of the selected region
            const selectedRegion = e.target.getAttribute('data-region');
            renderGyms(selectedRegion);
        });
    });
    //function to render gyms based on the selected region
    function renderGyms(region) {
        grid.innerHTML = ''; 
        const regionGyms = gymsDatabase[region];
        if (!regionGyms || regionGyms.length === 0) return;
        regionGyms.forEach(gym => {
            const clone = template.content.cloneNode(true);
            // Fill the card with gym data
            clone.querySelector('.gymCity').textContent = gym.city;
            clone.querySelector('.leaderName').textContent = gym.leader;
            clone.querySelector('.badgeName').textContent = gym.badge;
            //assign the image of the leader
            const img = clone.querySelector('.leaderImg');
            img.src = gym.image;
            img.alt = gym.leader;           
            //Color and types of the gym
            const typeContainer = clone.querySelector('.pokemonTypes');
            typeContainer.innerHTML = `<span class="typeBadge ${gym.type}">${gym.type}</span>`;
            clone.querySelector('.gymCard').classList.add(`bg-${gym.type}`);
            //MODAL EVENT
            const cardElement = clone.querySelector('.gymCard');
            cardElement.addEventListener('click', () => {
                console.log(`Challenging to ${gym.leader}! Team:`, gym.team);
                openLeaderModal(gym);
            });
            // Append the card to the grid
            grid.appendChild(clone);
        });
    }
}
// Function to open a modal with leader details (placeholder for now)
async function openLeaderModal(gym) {
    const modal = document.getElementById('pokemonModal');
    const modalBody = document.getElementById('modalBody');
    //show loading state while we fetch the team data
    modalBody.innerHTML = `
        <section class="loaderContainer">
            <div class="cssPokeball"></div>
            <p class="loadingText">Analyzing the team of ${gym.leader}...</p>
        </section>
    `;
    modal.showModal();
    try {
        //Fetch detailed data for each Pokémon in the leader's team
        const teamData = await Promise.all(
            gym.team.map(async (pokemonName) => {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
                if (!response.ok) throw new Error(`Error looking for ${pokemonName}`);
                return response.json();
            })
        );
        //Build the HTML for the team list inside the modal
        const teamHtml = teamData.map(pokemon => {
            //Refactor the types into badges
            const typesHtml = pokemon.types.map(t => 
                `<span class="typeBadge ${t.type.name}">${t.type.name}</span>`
            ).join('');
            //obtain the hp and attack stats for a quick overview (you can expand this with more stats if you want)
            const hp = pokemon.stats[0].base_stat;
            const attack = pokemon.stats[1].base_stat;
            // Return a card for each Pokémon in the team
            return `
            <article class="leaderTeamCard">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" 
                     alt="${pokemon.name}" 
                     class="teamMemberImg"
                     loading="lazy">
                <section class="teamMemberInfo">
                    <h4 class="teamMemberName">${pokemon.name}</h4>
                    <div class="pokemonTypes">
                        ${typesHtml}
                    </div>
                </section>
                
                <section class="teamMemberStats">
                    <div class="statLine">HP: <span class="statHpValue">${hp}</span></div>
                    <div class0"statLine">ATK: <span class="statAtkValue">${attack}</span></div>
                </section>
            </article>
            `;
        }).join('');
        // 4. Injecting all inside on modal
        modalBody.innerHTML = `
            <header class="modalHeader">
                <h3 class="modalTitle">Team of ${gym.leader}</h3>
                <p class="modalGymBadge">${gym.badge}</p>
            </header>
            
            <div class="leaderTeamList">
                ${teamHtml}
            </div>
        `;
    } catch (error) {
        console.error("Error cargando el equipo:", error);
        modalBody.innerHTML = `
            <div style="text-align:center; padding: 20px;">
                <p style="color: var(--charmander-red); font-weight: bold; font-size: 1.2rem;">¡Error de conexión!</p>
                <p style="color: var(--gray-medium); font-size: 0.9rem;">No pudimos conectar con la Liga Pokémon.</p>
            </div>
        `;
    }
}