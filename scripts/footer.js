import { nonatoDev, socialIcons } from './data.js';

function renderFooter() {
    // 1. Capturamos los elementos del DOM (Esto quita los errores de la consola)
    const socialMedia = document.getElementById('socialMedia');
    const footerInfo = document.getElementById('footerInfo');
    const lastMod = document.getElementById('lastModificated');

    // 2. Inyectamos las imágenes (Asegúrate de que socialIcons tenga las rutas a tus archivos)
    socialMedia.innerHTML = `
        <a href="https://github.com/tu-usuario" class="social-link" target="_blank" aria-label="GitHub">
            <img src="images/github-logo.svg" alt="GitHub" width="35" height="35">
        </a>
        <a href="https://linkedin.com/in/tu-perfil" class="social-link" target="_blank" aria-label="LinkedIn">
            <img src="images/linkedin-logo.svg" alt="LinkedIn" width="35" height="35">
        </a>
        <a href="https://instagram.com/tu-perfil" class="social-link" target="_blank" aria-label="Instagram">
            <img src="images/instagram-logo.svg" alt="Instagram" width="35" height="35">
        </a>
    `;

    // 3. Inyectamos la información legal y personal
    footerInfo.innerHTML = `
        <p>&copy; ${new Date().getFullYear()} | ${nonatoDev.name} | ${nonatoDev.residence}</p>
    `;

    // 4. Inyectamos la fecha de última modificación
    lastMod.innerHTML = `<p>Last Modification: ${document.lastModified}</p>`;
}

// Ejecutamos la función
renderFooter();