const cenaBtn = document.getElementById('cena');
const cineBtn = document.getElementById('cine');
const gallery = document.getElementById('gallery');
const confirmation = document.getElementById('confirmation');

cenaBtn.addEventListener('click', () => {
    confirmation.textContent = '¡Genial! Elegiste una cena romántica. ¡Te amo! ❤️';
    confirmation.style.display = 'block';
    gallery.style.display = 'block';
});

cineBtn.addEventListener('click', () => {
    confirmation.textContent = '¡Perfecto! Elegiste una noche de cine. ¡Te amo! 🎥❤️';
    confirmation.style.display = 'block';
    gallery.style.display = 'block';
});
