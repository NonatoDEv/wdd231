const membersUrl = 'data/members.json';

async function getMembersData() {
    try{
        const response = await fetch(membersUrl);
        if(response.ok){
            const data = await response.json();
            displayMembers(data.members);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error ('Error fetching members data:', error);
    }
}

const displayMembers = (members) => {
    const container = document.querySelector('#membersContainer');
    container.innerHTML = '';

    members.forEach((member) => {
        let card = document.createElement('section');
        card.classList.add('memberCard');
        if (member.membershipLevel === 3) {
            card.classList.add('goldMember');
        }

        card.innerHTML = `
            <img src="images/${member.image}" alt="Logo of ${member.name}" loading="lazy" class="memberLogo"/>
            <h2 class="memberName">${member.name}</h2>
            <p class="memberAddress">${member.address}</p>
            <p class="memberPhone">Phone: ${member.phone}</p>
            <a href="${member.website}" target="_blank" class="memberWebsite">Visit Website</a>
            <p class="tagline">${member.tagline}</p>
        `;

        container.appendChild(card);
    });
}

getMembersData();