const galleryItems = document.querySelectorAll('.gallery-item img');
    const fullscreenContainer = document.querySelector('.fullscreen-container');
    const fullscreenImage = document.querySelector('.fullscreen-image');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const toggleDarkModeBtn = document.querySelector('.toggle-dark-mode');    
let currentIndex = 0;

    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        currentIndex = index;
        const src = item.src;
        const alt = item.alt;

        fullscreenImage.src = src;
        fullscreenImage.alt = alt;

        fullscreenContainer.classList.add('active');
      });
    });

fullscreenContainer.addEventListener('click', (event) => {
  if (event.target === fullscreenContainer) {
    fullscreenContainer.classList.remove('active');
  }
});

    closeBtn.addEventListener('click', () => {
      fullscreenContainer.classList.remove('active');
    });

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  const src = galleryItems[currentIndex].src;
  const alt = galleryItems[currentIndex].alt;

  fullscreenImage.src = src;
  fullscreenImage.alt = alt;
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  const src = galleryItems[currentIndex].src;
  const alt = galleryItems[currentIndex].alt;

  fullscreenImage.src = src;
  fullscreenImage.alt = alt;
});


// Dark mode toggle
toggleDarkModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});


