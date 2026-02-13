const cenaBtn = document.getElementById('cena');
const cineBtn = document.getElementById('cine');
const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const confirmationModal = document.getElementById('confirmation-modal');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');
const inputContainer = document.getElementById('input-container');
const confirmBtn = document.getElementById('confirm-btn');
const finalMessage = document.getElementById('final-message');
const closeBtn = document.querySelector('.close');
const closeConfirmationBtn = document.querySelector('.close-confirmation');

let selectedOption = '';

document.getElementById('cena').addEventListener('click', function() {
    selectedOption = 'cena';
    gallery.style.display = 'block';
    modalTitle.textContent = '🍷 ¡Cena Romántica! 🍷';
    modalMessage.textContent = '¡Perfecto! ¿Dónde te gustaría cenar?';
    
    inputContainer.innerHTML = `
        <label for="lugar-cena">Elige el restaurante:</label>
        <input type="text" id="lugar-cena" " />
    `;
    
    modal.style.display = 'block';
});

document.getElementById('cine').addEventListener('click', function() {
    selectedOption = 'cine';
    gallery.style.display = 'block';
    modalTitle.textContent = '🎬 ¡Noche de Cine! 🎬';
    modalMessage.textContent = '¡Genial! ¿Qué película te gustaría ver?';
    
    inputContainer.innerHTML = `
        <label for="pelicula">Elige tu película favorita:</label>
        <input type="text" id="pelicula" />
    `;
    
    modal.style.display = 'block';
});

confirmBtn.addEventListener('click', function() {
    const fecha = new Date();
    const fechaFormateada = fecha.toLocaleDateString('es-ES', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    let datosReserva = {};
    
    if (selectedOption === 'cena') {
        const lugar = document.getElementById('lugar-cena').value;
        if (lugar.trim() === '') {
            alert('Por favor, ingresa el lugar donde quieres cenar ❤️');
            return;
        }
        
        finalMessage.textContent = `¡Perfecto mi amor! Nos vemos en ${lugar} para una cena romántica inolvidable. ¡Será mágico! 🍷✨`;
        
        datosReserva = {
            tipo: 'Cena Romántica',
            lugar: lugar,
            fecha: fechaFormateada,
            mensaje: 'Será una velada mágica con velas, tu comida favorita y mucho amor.'
        };
        
    } else if (selectedOption === 'cine') {
        const pelicula = document.getElementById('pelicula').value;
        if (pelicula.trim() === '') {
            alert('Por favor, ingresa la película que quieres ver ❤️');
            return;
        }
        
        finalMessage.textContent = `¡Excelente elección! Prepararé todo para ver "${pelicula}" con palomitas y mucho amor. ¡Será una noche perfecta! 🎬🍿`;
        
        datosReserva = {
            tipo: 'Noche de Cine',
            pelicula: pelicula,
            fecha: fechaFormateada,
            mensaje: 'Una noche perfecta acurrucados juntos con palomitas, mantas y mucho amor.'
        };
    }
    
    // Guardar en localStorage
    localStorage.setItem('planSanValentin', JSON.stringify(datosReserva));
    
    // Mostrar en consola (puedes abrir la consola del navegador para ver los datos)
    console.log('═══════════════════════════════════════');
    console.log('PLAN DE SAN VALENTÍN GUARDADO:');
    console.log('═══════════════════════════════════════');
    console.log(datosReserva);
    console.log('═══════════════════════════════════════');
    
    modal.style.display = 'none';
    confirmationModal.style.display = 'block';
});

// Cerrar modales
closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});

closeConfirmationBtn.addEventListener('click', function() {
    confirmationModal.style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
    if (event.target === confirmationModal) {
        confirmationModal.style.display = 'none';
    }
});

// Ver datos guardados (puedes llamar esta función desde la consola)
function verPlanGuardado() {
    const plan = localStorage.getItem('planSanValentin');
    if (plan) {
        console.log('Plan guardado:', JSON.parse(plan));
        return JSON.parse(plan);
    } else {
        console.log('No hay plan guardado aún');
        return null;
    }
}
