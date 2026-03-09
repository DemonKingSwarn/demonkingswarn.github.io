const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalContainer = document.getElementById('modal-container');
let currentIndex = 0;

async function loadGallery() {
    await loadFiles();

    for (let i = 0; i < mediaFiles.length; i++) {
        const file = mediaFiles[i];
        const div = document.createElement('div');
        div.className = 'item';
        div.onclick = () => openModal(i);

        const type = file.toLowerCase().split('.').pop();
        const icon = document.createElement('span');
        icon.className = 'type-icon';
        icon.textContent = type.toUpperCase();
        div.appendChild(icon);

        if (['mp4', 'webm', 'ogg'].includes(type)) {
            const video = document.createElement('video');
            video.src = file;
            video.muted = true;
            video.onmouseover = () => video.play();
            video.onmouseout = () => { video.pause(); video.currentTime = 0; };
            div.appendChild(video);
        } else if (type === 'heic') {
            const loading = document.createElement('div');
            loading.className = 'loading';
            loading.textContent = 'HEIC...';
            div.appendChild(loading);

            const img = document.createElement('img');
            img.setAttribute('data-heic', file);
            div.appendChild(img);

            observer.observe(div);
        } else {
            const img = document.createElement('img');
            img.src = file;
            img.loading = 'lazy';
            div.appendChild(img);
        }

        gallery.appendChild(div);
    }
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const div = entry.target;
            const img = div.querySelector('img[data-heic]');
            if (img) convertHEIC(img, img.getAttribute('data-heic'), div);
            observer.unobserve(div);
        }
    });
});

async function convertHEIC(imgElement, src, div) {
    try {
        const res = await fetch(src);
        const blob = await res.blob();
        const conversionResult = await heic2any({ blob, toType: 'image/jpeg', quality: 0.5 });
        imgElement.src = URL.createObjectURL(conversionResult);
        imgElement.removeAttribute('data-heic');
        const loading = div.querySelector('.loading');
        if (loading) loading.remove();
    } catch (e) {
        console.error('HEIC conversion failed for ' + src, e);
    }
}

function openModal(index) {
    currentIndex = index;
    modal.style.display = 'flex';
    updateModal();
}

async function updateModal() {
    modalContainer.innerHTML = '';
    const file = mediaFiles[currentIndex];
    const type = file.toLowerCase().split('.').pop();

    if (['mp4', 'webm', 'ogg'].includes(type)) {
        const video = document.createElement('video');
        video.id = 'modal-content';
        video.src = file;
        video.controls = true;
        video.autoplay = true;
        modalContainer.appendChild(video);
    } else if (type === 'heic') {
        const img = document.createElement('img');
        img.id = 'modal-content';
        modalContainer.appendChild(img);
        try {
            const res = await fetch(file);
            const blob = await res.blob();
            const conversionResult = await heic2any({ blob, toType: 'image/jpeg', quality: 0.9 });
            img.src = URL.createObjectURL(conversionResult);
        } catch (e) { console.error(e); }
    } else {
        const img = document.createElement('img');
        img.id = 'modal-content';
        img.src = file;
        modalContainer.appendChild(img);
    }
}

function closeModal() {
    modal.style.display = 'none';
    modalContainer.innerHTML = '';
}

function navigate(dir) {
    currentIndex = (currentIndex + dir + mediaFiles.length) % mediaFiles.length;
    updateModal();
}

document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'flex') {
        if (e.key === 'ArrowLeft') navigate(-1);
        if (e.key === 'ArrowRight') navigate(1);
        if (e.key === 'Escape') closeModal();
    }
});

loadGallery();
