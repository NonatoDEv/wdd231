export function updateNavBadge() {
    const navBadge = document.getElementById('navBadge');
    if (navBadge) {
        const myTeam = JSON.parse(localStorage.getItem('myPokeTeam')) || [];
        navBadge.textContent = myTeam.length;
    }
}