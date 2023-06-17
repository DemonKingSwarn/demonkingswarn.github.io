const galleryItems = document.querySelectorAll('.gallery-item img');
    const fullscreenContainer = document.querySelector('.fullscreen-container');
    const fullscreenImage = document.querySelector('.fullscreen-image');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
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

// Initialize Resizer
window.addEventListener('DOMContentLoaded', () => {
  const resizer = new DomResizer();
  resizer.resize();
});
