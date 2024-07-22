// Sample game data
const games = [
    {
        title: "Zombie Shooter",
        year: 2021,
        genre: "Top Down Shooter",
        page: "https://gamersinunity-studio.itch.io/zombie-shooter"
    },
    {
        title: "NotQuietHexagon",
        year: 2021,
        genre: "Casual",
        page: "https://gamersinunity-studio.itch.io/notquiethexagon"
    },
    {
        title: "Bad Game?",
        year: 2021,
        genre: "Casual",
        page: "https://gamersinunity-studio.itch.io/bad-game"
    },
    {
        title: "PongExtreme",
        year: 2021,
        genre: "Retro",
        page: "https://gamersinunity-studio.itch.io/pongextreme"
    },
    {
        title: "The Killer Cylinder",
        year: 2020,
        genre: "FPS",
        page: "https://gamersinunity-studio.itch.io/the-killer-cylinder"
    },
    {
        title: "Meteorite Mayday: Planet Panic",
        year: 2023,
        genre: "Isometric",
        page: "https://gamersinunity-studio.itch.io/meteorite-mayday-planet-panic"
    },
    {
        title: "Spike Hopper",
        year: 2023,
        genre: "Retro",
        page: "https://gamersinunity-studio.itch.io/spike-hopper"
    },
    {
        title: "Big Baby Goes Wild",
        year: 2024,
        genre: "Top-Down",
        page: "https://gamersinunity-studio.itch.io/big-baby-goes-wild"
    }
    // Add more game objects as needed
];

// Sample skills data
const skills = [
    {
        category: "Languages",
        list: ["JavaScript", "C#", "C", "C++", "Python", "BASH", "Java", "Lua", "GDScript"]
    },
    {
        category: "Tools",
        list: ["Unity", "Godot", "Emacs", "Vim", "GIMP", "Git"]
    },
    // Add more skills objects as needed
];

/*
// Function to generate the game rows dynamically in the table
function generateGameTable() {
    const gameList = document.getElementById('gameList');

    games.forEach(game => {
        const row = document.createElement('tr');
        const titleCell = document.createElement('td');
        const titleLink = document.createElement('a');
        titleLink.href = game.page; // Set the hyperlink to the game's page
        titleLink.textContent = game.title; // Set the game's title as the link text
        titleCell.appendChild(titleLink);
        row.appendChild(titleCell);
        row.innerHTML += `
            <td>${game.year}</td>
            <td>${game.genre}</td>
        `;
        gameList.appendChild(row);
    });
}*/

// Function to generate the game rows dynamically in the table
function generateGameTable() {
    const gameList = document.getElementById('gameList');

    // Sort the game list based on the year in ascending order
    games.sort((a, b) => a.year - b.year);

    games.forEach(game => {
        const row = document.createElement('tr');
        const titleCell = document.createElement('td');
        const titleLink = document.createElement('a');
        titleLink.href = game.page; // Set the hyperlink to the game's page
        titleLink.textContent = game.title; // Set the game's title as the link text
        titleCell.appendChild(titleLink);
        row.appendChild(titleCell);
        row.innerHTML += `
            <td>${game.year}</td>
            <td>${game.genre}</td>
        `;
        gameList.appendChild(row);
    });
}

// Function to generate the skills rows dynamically in the table
function generateSkillsTable() {
    const skillsList = document.getElementById('skillsList');

    skills.forEach(skill => {
        const row = document.createElement('tr');
        const categoryCell = document.createElement('td');
        categoryCell.textContent = skill.category;
        row.appendChild(categoryCell);

        const listCell = document.createElement('td');
        const ul = document.createElement('ul');
        skill.list.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            ul.appendChild(li);
        });
        listCell.appendChild(ul);
        row.appendChild(listCell);

        skillsList.appendChild(row);
    });
}

// Function to check scroll position and show/hide footer
function checkScrollPosition() {
    const footer = document.querySelector('footer');
    const scrollPosition = window.innerHeight + window.pageYOffset;
    const footerPosition = footer.offsetTop + footer.offsetHeight;

    if (scrollPosition >= footerPosition) {
        footer.classList.add('show-footer');
    } else {
        footer.classList.remove('show-footer');
    }
}

// Call the functions to generate the tables on page load
window.onload = function() {
    generateGameTable();
    generateSkillsTable();
    checkScrollPosition(); // Check initial scroll position

    // Add scroll event listener to check scroll position
    window.addEventListener('scroll', checkScrollPosition);
};
