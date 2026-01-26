export async function initSpotlights() {
    const spotlightContainer = document.querySelector('#spotlight-container');
    if (!spotlightContainer) return;

    try {
        const response = await fetch('data/members.json');
        const data = await response.json();

        
        const premiumMembers = data.members.filter(member => 
            member.membership === 3 || member.membership === 2
        );

        const shuffled = premiumMembers.sort(() => 0.5 - Math.random());
        const selectedMembers = shuffled.slice(0, 3);

        displaySpotlights(selectedMembers, spotlightContainer);

    } catch (error) {
        console.error("Error loading spotlights:", error);
        spotlightContainer.innerHTML = "<p>Featured members temporarily unavailable.</p>";
    }
}

function displaySpotlights(members, container) {
    container.innerHTML = members.map(member => {
        
        const membershipClass = member.membership === 3 ? 'gold' : 'silver';

        return `
            <div class="spotlight-card ${membershipClass}">
                <div class="spotlight-header">
                    <h3>${member.name}</h3>
                    <p class="tagline">${member.tagline || 'Business Partner'}</p>
                </div>
                <div class="spotlight-body">
                    <img src="images/${member.image}" alt="${member.name}" loading="lazy" width="150" height="100">
                    <div class="spotlight-info">
                        <p><strong>EMAIL:</strong> ${member.email}</p>
                        <p><strong>PHONE:</strong> ${member.phone}</p>
                        <p><strong>URL:</strong> <a href="${member.website}" target="_blank">${member.website.replace('https://', '')}</a></p>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}