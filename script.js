const canvas = document.getElementById('asteroids-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ship = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    angle: 0,
    size: 20,
    rotateSpeed: 0.02,
    moveSpeed: 2
};

const bullets = [];
const asteroids = [];
let lastBulletTime = 0;
const bulletInterval = 800;
const asteroidInterval = 2000;
let lastAsteroidTime = 0;

function drawShip() {
    ctx.save();
    ctx.translate(ship.x, ship.y);
    ctx.rotate(ship.angle);
    ctx.strokeStyle = '#cba6f7';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(ship.size, 0);
    ctx.lineTo(-ship.size / 2, ship.size / 2);
    ctx.lineTo(-ship.size / 2, -ship.size / 2);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
}

function updateShip() {
    ship.angle += ship.rotateSpeed;
    ship.x += Math.cos(ship.angle) * ship.moveSpeed * 0.3;
    ship.y += Math.sin(ship.angle) * ship.moveSpeed * 0.3;

    if (ship.x < -50) ship.x = canvas.width + 50;
    if (ship.x > canvas.width + 50) ship.x = -50;
    if (ship.y < -50) ship.y = canvas.height + 50;
    if (ship.y > canvas.height + 50) ship.y = -50;
}

function createBullet() {
    bullets.push({
        x: ship.x + Math.cos(ship.angle) * ship.size,
        y: ship.y + Math.sin(ship.angle) * ship.size,
        vx: Math.cos(ship.angle) * 6,
        vy: Math.sin(ship.angle) * 6,
        life: 100
    });
}

function updateBullets() {
    for (let i = bullets.length - 1; i >= 0; i--) {
        const b = bullets[i];
        b.x += b.vx;
        b.y += b.vy;
        b.life--;
        if (b.life <= 0 || b.x < 0 || b.x > canvas.width || b.y < 0 || b.y > canvas.height) {
            bullets.splice(i, 1);
        }
    }
}

function drawBullets() {
    ctx.fillStyle = '#f5c2e7';
    bullets.forEach(b => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, 2, 0, Math.PI * 2);
        ctx.fill();
    });
}

function createAsteroid() {
    const side = Math.floor(Math.random() * 4);
    let x, y, vx, vy;
    const size = 20 + Math.random() * 30;

    switch (side) {
        case 0: x = -size; y = Math.random() * canvas.height; vx = 1 + Math.random(); vy = (Math.random() - 0.5) * 2; break;
        case 1: x = canvas.width + size; y = Math.random() * canvas.height; vx = -(1 + Math.random()); vy = (Math.random() - 0.5) * 2; break;
        case 2: x = Math.random() * canvas.width; y = -size; vx = (Math.random() - 0.5) * 2; vy = 1 + Math.random(); break;
        case 3: x = Math.random() * canvas.width; y = canvas.height + size; vx = (Math.random() - 0.5) * 2; vy = -(1 + Math.random()); break;
    }

    asteroids.push({ x, y, vx, vy, size, rotation: 0, rotSpeed: (Math.random() - 0.5) * 0.05, vertices: [] });

    const lastAsteroid = asteroids[asteroids.length - 1];
    const numVerts = 7 + Math.floor(Math.random() * 5);
    for (let i = 0; i < numVerts; i++) {
        const angle = (i / numVerts) * Math.PI * 2;
        const r = lastAsteroid.size * (0.7 + Math.random() * 0.3);
        lastAsteroid.vertices.push({ angle, r });
    }
}

function updateAsteroids() {
    for (let i = asteroids.length - 1; i >= 0; i--) {
        const a = asteroids[i];
        a.x += a.vx;
        a.y += a.vy;
        a.rotation += a.rotSpeed;

        if (a.x < -100 || a.x > canvas.width + 100 || a.y < -100 || a.y > canvas.height + 100) {
            asteroids.splice(i, 1);
        }
    }
}

function drawAsteroids() {
    ctx.strokeStyle = '#89b4fa';
    ctx.lineWidth = 1.5;
    asteroids.forEach(a => {
        ctx.save();
        ctx.translate(a.x, a.y);
        ctx.rotate(a.rotation);
        ctx.beginPath();
        a.vertices.forEach((v, i) => {
            const x = Math.cos(v.angle) * v.r;
            const y = Math.sin(v.angle) * v.r;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    });
}

function checkCollisions() {
    for (let i = asteroids.length - 1; i >= 0; i--) {
        for (let j = bullets.length - 1; j >= 0; j--) {
            const a = asteroids[i];
            const b = bullets[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < a.size) {
                asteroids.splice(i, 1);
                bullets.splice(j, 1);
                break;
            }
        }
    }
}

function gameLoop(timestamp) {
    ctx.fillStyle = '#11111b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    updateShip();
    updateBullets();
    updateAsteroids();
    checkCollisions();

    if (timestamp - lastBulletTime > bulletInterval) {
        createBullet();
        lastBulletTime = timestamp;
    }

    if (timestamp - lastAsteroidTime > asteroidInterval) {
        createAsteroid();
        lastAsteroidTime = timestamp;
    }

    drawShip();
    drawBullets();
    drawAsteroids();

    requestAnimationFrame(gameLoop);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ship.x = canvas.width / 2;
    ship.y = canvas.height / 2;
});

requestAnimationFrame(gameLoop);

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
