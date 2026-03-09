let mediaFiles = [];

async function loadFiles() {
    const res = await fetch('data/files.json');
    mediaFiles = await res.json();
}
