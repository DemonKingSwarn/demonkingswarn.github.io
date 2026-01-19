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
