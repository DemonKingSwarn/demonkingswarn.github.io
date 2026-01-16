document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('socials.json');
    const data = await response.json();
    
    renderProfile(data.profile);
    renderLinks(data.links);
    renderSocialLinks(data.social);
    initAnimations();
    initMusicPlayer();
  } catch (error) {
    console.error('Error loading social data:', error);
  }
});

function renderProfile(profile) {
  const avatar = document.getElementById('profile-avatar');
  const name = document.getElementById('profile-name');
  const tagline = document.getElementById('profile-tagline');
  
  if (profile.avatar) avatar.src = profile.avatar;
  if (profile.name) name.textContent = profile.name;
  if (profile.tagline) tagline.textContent = profile.tagline;
}

function renderLinks(links) {
  const container = document.getElementById('links-container');
  container.innerHTML = links.map(link => `
    <a href="${link.url}" class="link-card" target="_blank" rel="noopener noreferrer">
      <span class="link-icon">${link.icon}</span>
      <span class="link-text">${link.name}</span>
      <span class="link-arrow">→</span>
    </a>
  `).join('');
}

function renderSocialLinks(social) {
  const container = document.getElementById('social-container');
  container.innerHTML = social.map(item => `
    <a href="${item.url}" target="_blank" rel="noopener noreferrer" aria-label="${item.name}">
      ${item.label}
    </a>
  `).join('');
}

function initAnimations() {
  const linkCards = document.querySelectorAll('.link-card');
  
  linkCards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
      const icon = card.querySelector('.link-icon');
      icon.style.transform = 'scale(1.2)';
      icon.style.transition = 'transform 0.2s ease';
    });
    
    card.addEventListener('mouseleave', (e) => {
      const icon = card.querySelector('.link-icon');
      icon.style.transform = 'scale(1)';
    });
  });

  document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.boxShadow = '0 4px 15px rgba(203, 166, 247, 0.4)';
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.boxShadow = 'none';
    });
  });

  const avatar = document.querySelector('.avatar');
  if (avatar) {
    avatar.addEventListener('click', () => {
      avatar.style.transform = 'rotate(360deg) scale(1.1)';
      setTimeout(() => {
        avatar.style.transform = '';
      }, 500);
    });
  }
}

function initMusicPlayer() {
  const audio = document.getElementById('background-music');
  const toggle = document.getElementById('music-toggle');
  
  if (!audio || !toggle) return;
  
  audio.volume = 0.3;
  
  let hasStarted = false;
  
  function startMusic() {
    if (!hasStarted) {
      hasStarted = true;
      audio.play().catch(err => console.log('Audio play failed:', err));
    }
  }
  
  document.addEventListener('click', startMusic, { once: true });
  document.addEventListener('touchstart', startMusic, { once: true });
  
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    startMusic();
    if (audio.paused) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  });
  
  function updateButton() {
    if (audio.paused) {
      toggle.classList.remove('playing');
      toggle.querySelector('.music-icon').textContent = '♪';
    } else {
      toggle.classList.add('playing');
      toggle.querySelector('.music-icon').textContent = '❚❚';
    }
  }
  
  audio.addEventListener('play', updateButton);
  audio.addEventListener('pause', updateButton);
  audio.addEventListener('ended', updateButton);
}
