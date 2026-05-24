// --- 🎛️ Element Selectors ---
const portraitButtons = document.querySelectorAll('.portrait-circle');
const mainArtwork = document.getElementById('mainArtwork');
const charName = document.getElementById('charName');
const charCompany = document.getElementById('charCompany');
const charDate = document.getElementById('charDate');
const charVoice = document.getElementById('charVoice');
const hexagonCanvas = document.getElementById('hexagonCanvas');
const displayViewport = document.querySelector('.display-viewport');

// --- 🌌 Dynamic Hexagon Generator Function ---
function generateHexagons(button) {
    hexagonCanvas.innerHTML = '';

    const colors = [
        button.style.getPropertyValue('--accent-1'),
        button.style.getPropertyValue('--accent-2'),
        button.style.getPropertyValue('--accent-3')
    ];

    for (let i = 0; i < 12; i++) {
        const hex = document.createElement('div');
        hex.classList.add('hexagon');

        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        hex.style.backgroundColor = randomColor;

        const size = Math.floor(Math.random() * 50) + 30;
        hex.style.width = `${size}px`;
        hex.style.height = `${size}px`;

        hex.style.top = `${Math.floor(Math.random() * 80) + 10}%`;
        hex.style.left = `${Math.floor(Math.random() * 80) + 10}%`;

        if (i < 6) {
            hex.style.zIndex = "1";
            hex.style.opacity = "0.25"; 
        } else {
            hex.style.zIndex = "3";
            hex.style.opacity = "0.12"; 
        }

        hexagonCanvas.appendChild(hex);
    }
}

// --- ⚡ Main Character Swap Controller ---
function switchCharacter(button) {
    portraitButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const id = button.getAttribute('data-id');
    const name = button.getAttribute('data-name');
    const company = button.getAttribute('data-company');
    const date = button.getAttribute('data-date');
    const voice = button.getAttribute('data-voice');

    const primaryGlow = button.style.getPropertyValue('--accent-1');
    displayViewport.style.setProperty('--current-glow', primaryGlow);

    mainArtwork.classList.remove('active-entry');

    const folder = company.includes('CFM') ? 'CFM' : 'CEVIO';

    setTimeout(() => {
        mainArtwork.src = `${folder}/${id}.png`;
        mainArtwork.alt = name;
        mainArtwork.classList.add('active-entry');
        
        charName.textContent = name;
        charCompany.textContent = company;
        charDate.textContent = date;
        charVoice.textContent = voice;
    }, 50);

    generateHexagons(button);
}

// --- 🕹️ Event Listeners & Initialization Deck ---
portraitButtons.forEach(button => {
    button.addEventListener('click', () => switchCharacter(button));
});

document.addEventListener('DOMContentLoaded', () => {
    // Default initial load targeted directly on Miku
    const defaultSelection = document.querySelector('.portrait-circle[data-id="miku"]');
    if (defaultSelection) {
        switchCharacter(defaultSelection);
    }
});