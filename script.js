const canvas = document.getElementById('asteroids-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const glow = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 600
};

document.addEventListener('mousemove', (e) => {
    glow.x = e.clientX;
    glow.y = e.clientY;
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function drawGlow() {
    const gradient = ctx.createRadialGradient(glow.x, glow.y, 0, glow.x, glow.y, glow.size);
    gradient.addColorStop(0, 'rgba(203, 166, 247, 0.15)');
    gradient.addColorStop(0.5, 'rgba(180, 190, 254, 0.08)');
    gradient.addColorStop(1, 'transparent');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function gameLoop() {
    ctx.fillStyle = '#11111b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGlow();
    requestAnimationFrame(gameLoop);
}

gameLoop();

const displayGames = async () => {
    const projectsGrid = document.querySelector('.projects-grid');
    try {
        const response = await fetch('data/games.json');
        if (!response.ok) throw new Error('Failed to load games');
        const games = await response.json();

        games.sort((a, b) => parseInt(b.year) - parseInt(a.year));

        games.forEach(game => {
            const projectCard = document.createElement('a');
            projectCard.href = game.url;
            projectCard.classList.add('project-card');
            projectCard.target = '_blank';
            projectCard.innerHTML = `
                <h3>${game.title}</h3>
                <div class="meta">${game.engine} · ${game.storefront} · ${game.year}</div>
                <p>${game.description}</p>
            `;
            projectsGrid.appendChild(projectCard);
        });
    } catch (error) {
        console.error('Error loading games:', error);
    }
};

const displayContacts = async () => {
    const socialLinksDiv = document.querySelector('.social-links');
    try {
        const response = await fetch('data/contacts.json');
        if (!response.ok) throw new Error('Failed to load contacts');
        const contacts = await response.json();

        contacts.forEach(contact => {
            const contactLink = document.createElement('a');
            contactLink.href = contact.url;
            contactLink.target = '_blank';
            contactLink.textContent = contact.name;
            socialLinksDiv.appendChild(contactLink);
        });
    } catch (error) {
        console.error('Error loading contacts:', error);
    }
};

const displaySkills = async () => {
    const skillsGrid = document.querySelector('.skills-grid');
    try {
        const response = await fetch('data/lang_and_tools.json');
        if (!response.ok) throw new Error('Failed to load skills');
        const data = await response.json();

        const skills = [...data.languages, ...data.tools];

        skills.forEach(skillName => {
            const skillDiv = document.createElement('div');
            skillDiv.classList.add('skill');
            skillDiv.textContent = skillName;
            skillsGrid.appendChild(skillDiv);
        });
    } catch (error) {
        console.error('Error loading skills:', error);
    }
};

displayGames();
displayContacts();
displaySkills();

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
});
