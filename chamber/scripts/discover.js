import { location } from "../data/discover.mjs";

const container = document.querySelector('.discoverGrid');
const placesToDisplay = location.slice(0, 10);

placesToDisplay.forEach(place =>{
    const card = document.createElement('section');
    card.classList.add('card')

    card.style.gridArea = place.id;

    card.innerHTML= `
        <h2>${place.title}</h2>
        <figure>
            <img src="${place.image}" alt="${place.title}" width="300" height="200" loading="lazy">
        </figure>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button>Learn More</button>
        `;
    
    container.appendChild(card);
})