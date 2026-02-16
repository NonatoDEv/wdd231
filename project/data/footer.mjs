export function renderFooter() {
    const footerElement = document.getElementById('footerContent');
    const currentYear = new Date().getFullYear();
    const lastModification = document.lastModified;
    const author = "Abel Jesus Nonato Avalos | nonatoDev";
    const location = "Chincha, Perú";

    footerElement.innerHTML = `
        <div class="footerContainer">
            <div id="socialMedia" class="socialLinksContainer">
                <a href="https://github.com/NonatoDEv" class="socialLink" target="_blank" aria-label="GitHub">
                    <img src="images/github-logo.svg" alt="GitHub" width="30" height="30">
                </a>
                <a href="https://www.linkedin.com/in/a-j-nonato92" class="socialLink" target="_blank" aria-label="LinkedIn">
                    <img src="images/linkedin-logo.svg" alt="LinkedIn" width="30" height="30">
                </a>
                <a href="https://www.instagram.com/abeljesusnonato" class="socialLink" target="_blank" aria-label="Instagram">
                    <img src="images/instagram-logo.svg" alt="LinkedIn" width="30" height="30">
                </a>
            </div>
            <div id="footerInfo">
                <p>&copy; ${currentYear} | <strong>${author}</strong> | ${location}</p>
                <p class="apiCredit">Data provided by <a href="https://pokeapi.co/" target="_blank">PokeAPI</a></p>
            </div>
            <div id="lastModify">
                <p class="apiCredit">Last Modification: ${lastModification}</p>
            </div>
        </div>
    `;
}