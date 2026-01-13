import { nonatoDev, socialIcons } from './data.js';

function renderFooter() {
    const socialMedia = document.getElementById('socialMedia');
    const footerInfo = document.getElementById('footerInfo');
    const lastMod = document.getElementById('lastModify');
    socialMedia.innerHTML = `
        <a href="https://github.com/NonatoDEv" class="social-link" target="_blank" aria-label="GitHub">
            <img src="images/github-logo.svg" alt="GitHub" width="35" height="35">
        </a>
        <a href="https://www.linkedin.com/in/a-j-nonato92" class="social-link" target="_blank" aria-label="LinkedIn">
            <img src="images/linkedin-logo.svg" alt="LinkedIn" width="35" height="35">
        </a>
        <a href="https://www.instagram.com/abeljesusnonato" class="social-link" target="_blank" aria-label="Instagram">
            <img src="images/instagram-logo.svg" alt="Instagram" width="35" height="35">
        </a>
    `;
    footerInfo.innerHTML = `
        <p>&copy; ${new Date().getFullYear()} | ${nonatoDev.name} | ${nonatoDev.residence}</p>
    `;
    lastMod.innerHTML = `<p>Last Modification: ${document.lastModified}</p>`;
}
renderFooter();