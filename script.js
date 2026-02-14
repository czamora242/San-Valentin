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

// Botón Cena Romántica
document.getElementById('cena').addEventListener('click', function() {
    selectedOption = 'cena';
    gallery.style.display = 'block';
    modalTitle.textContent = '🍷 ¡Cena Romántica! 🍷';
    modalMessage.textContent = '¡Perfecto! ¿Dónde te gustaría cenar?';
    
    inputContainer.innerHTML = `
        <label for="lugar-cena">Elige el restaurante:</label>
        <input type="text" id="lugar-cena" placeholder="Ej: La Trattoria, Casa Morales, etc." />
    `;
    
    confirmationModal.style.display = 'none';
    modal.style.display = 'block';
});

// Botón Noche de Cine
document.getElementById('cine').addEventListener('click', function() {
    selectedOption = 'cine';
    gallery.style.display = 'block';
    modalTitle.textContent = '🎬 ¡Noche de Cine! 🎬';
    modalMessage.textContent = '¡Genial! ¿Qué película te gustaría ver?';
    
    inputContainer.innerHTML = `
        <label for="pelicula">Elige tu película favorita:</label>
        <input type="text" id="pelicula" placeholder="Ej: Titanic, Notebook, La La Land, etc." />
    `;
    
    confirmationModal.style.display = 'none';
    modal.style.display = 'block';
});

// Función para guardar en Firebase
async function guardarEnFirebase(datosReserva) {
    try {
        // Esperar a que Firebase esté listo
        if (!window.db) {
            console.error('⚠️ Firebase aún no está inicializado. Esperando...');
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        const docRef = await window.addDoc(window.collection(window.db, 'planes_san_valentin'), datosReserva);
        
        console.log('════════════════════════════════════════');
        console.log('✅ ¡GUARDADO EXITOSO EN FIREBASE!');
        console.log('════════════════════════════════════════');
        console.log('📄 ID del documento:', docRef.id);
        console.log('📊 Datos guardados:', datosReserva);
        console.log('════════════════════════════════════════');
        
        return true;
    } catch (error) {
        console.error('════════════════════════════════════════');
        console.error('❌ ERROR AL GUARDAR EN FIREBASE');
        console.error('════════════════════════════════════════');
        console.error('Detalles del error:', error);
        console.error('Código de error:', error.code);
        console.error('Mensaje:', error.message);
        console.error('════════════════════════════════════════');
        
        alert('Hubo un error al guardar. Verifica la consola para más detalles.');
        return false;
    }
}

// Confirmar selección
confirmBtn.addEventListener('click', async function() {
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
            timestamp: window.serverTimestamp(),
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
            timestamp: window.serverTimestamp(),
            mensaje: 'Una noche perfecta acurrucados juntos con palomitas, mantas y mucho amor.'
        };
    }
    
    // Mostrar indicador de carga
    confirmBtn.textContent = 'Guardando... ⏳';
    confirmBtn.disabled = true;
    
    // Guardar en Firebase
    const guardado = await guardarEnFirebase(datosReserva);
    
    // Restaurar botón
    confirmBtn.textContent = 'Confirmar ❤️';
    confirmBtn.disabled = false;
    
    if (guardado) {
        // También guardar localmente como respaldo
        localStorage.setItem('planSanValentin', JSON.stringify(datosReserva));
        
        // Cerrar primer modal y abrir el de confirmación
        modal.style.display = 'none';
        confirmationModal.style.display = 'block';
    }
});

// Cerrar modales con la X
if (closeBtn) {
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
}

if (closeConfirmationBtn) {
    closeConfirmationBtn.addEventListener('click', function() {
        confirmationModal.style.display = 'none';
    });
}

// Cerrar al hacer clic fuera del modal
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
    if (event.target === confirmationModal) {
        confirmationModal.style.display = 'none';
    }
});

// Función para ver todos los planes guardados (ejecuta en la consola del navegador)
async function verTodosLosPlanesGuardados() {
    try {
        const q = window.query(window.collection(window.db, 'planes_san_valentin'), window.orderBy('timestamp', 'desc'));
        const querySnapshot = await window.getDocs(q);
        
        console.log('════════════════════════════════════════');
        console.log(`📋 TOTAL DE PLANES GUARDADOS: ${querySnapshot.size}`);
        console.log('════════════════════════════════════════');
        
        querySnapshot.forEach((doc) => {
            console.log(`\n🆔 ID: ${doc.id}`);
            console.log('📄 Datos:', doc.data());
            console.log('---');
        });
        
        console.log('════════════════════════════════════════');
    } catch (error) {
        console.error('❌ Error al leer los planes:', error);
    }
}

// Hacer la función disponible globalmente
window.verTodosLosPlanesGuardados = verTodosLosPlanesGuardados;

console.log('💡 Para ver todos los planes guardados, escribe en la consola:');
console.log('   verTodosLosPlanesGuardados()');
