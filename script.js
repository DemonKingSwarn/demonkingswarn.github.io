if (navigator.userAgent.toLowerCase().includes('curl')) {
    window.location.href = 'index.txt';
}

const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });
}

const displayGames = async () => {
    const projectsGrid = document.querySelector('.projects-grid');
    const response = await fetch('data/games.json');
    const games = await response.json();

    games.sort((a, b) => parseInt(b.year) - parseInt(a.year));

    // Add VideoGame Schema for each game
    games.forEach(game => {
        const projectCard = document.createElement('a');
        projectCard.href = game.url;
        projectCard.classList.add('project-card');

        projectCard.innerHTML = `
            <h3>${game.title}</h3>
            <div class="subtitle">
                <span>${game.engine}</span> | <span>${game.storefront}</span>
            </div>
            <p class="year">${game.year}</p>
            <p class="development-type">${game.development_type}</p>
            <p>${game.description}</p>
        `;

        projectsGrid.appendChild(projectCard);

        // Add JSON-LD Schema for each game
        const schema = {
            "@context": "https://schema.org",
            "@type": "VideoGame",
            "name": game.title,
            "description": game.description,
            "url": game.url,
            "gamePlatform": game.storefront === "Steam" ? "PC" : "Web Browser",
            "applicationCategory": "Game",
            "author": {
                "@type": "Person",
                "name": "Swarnaditya Singh",
                "alternateName": "DemonKingSwarn"
            },
            "datePublished": game.year,
            "gameEngine": game.engine,
            "creativeWorkStatus": "Published"
        };

        const scriptTag = document.createElement('script');
        scriptTag.type = 'application/ld+json';
        scriptTag.textContent = JSON.stringify(schema);
        document.head.appendChild(scriptTag);
    });
}

navSlide();
displayGames();

const displayContacts = async () => {
    const socialLinksDiv = document.querySelector('.social-links');
    const response = await fetch('data/contacts.json');
    const contacts = await response.json();

    contacts.forEach(contact => {
        const contactLink = document.createElement('a');
        contactLink.href = contact.url;
        contactLink.target = "_blank";
        contactLink.textContent = contact.name;
        socialLinksDiv.appendChild(contactLink);
    });
}

displayContacts();

const displaySkills = async () => {
    const skillsGrid = document.querySelector('.skills-grid');
    const response = await fetch('data/lang_and_tools.json');
    const data = await response.json();

    const skills = [...data.languages, ...data.tools];

    skills.forEach(skillName => {
        const skillDiv = document.createElement('div');
        skillDiv.classList.add('skill');
        skillDiv.textContent = skillName;
        skillsGrid.appendChild(skillDiv);
    });
}

displaySkills();

window.addEventListener('scroll', () => {
    const parallax = document.querySelector('.parallax-bg');
    let scrollPosition = window.pageYOffset;

    parallax.style.transform = `translateY(${scrollPosition * 0.5}px)`;
});

const typeWriterEffect = (elementId, text, delay = 100) => {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with ID "${elementId}" not found.`);
        return;
    }
    element.textContent = ''; // Clear existing text
    let i = 0;
    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, delay);
        }
    };
    type();
};

// Call the typewriter effect on page load
window.addEventListener('load', () => {
    const textToType = "Hello, I am Swarnaditya";
    typeWriterEffect('typewriter-text', textToType);
});
