// ----------------------
// MODAL EDITAR Y BORRAR
// ----------------------

// Modal Editar
const modalEdit = document.getElementById('modal-edit');
const modalEditOverlay = document.getElementById('modal-edit-overlay');
const modalEditClose = document.getElementById('modal-edit-close');

// Modal Borrar
const modalDelete = document.getElementById('modal-delete');
const modalDeleteOverlay = document.getElementById('modal-delete-overlay');
const modalDeleteClose = document.getElementById('modal-delete-close');

// Botones de la tabla
const btnEdits = document.querySelectorAll('.button--edit');
const btnDeletes = document.querySelectorAll('.button--delete');

// ----------------------
// LÓGICA MODAL EDITAR
// ----------------------

// Abrir modal Editar
btnEdits.forEach(btn => {
    btn.addEventListener('click', () => {
        modalEdit.classList.add('active');
    });
});

// Cerrar modal Editar al hacer click en la X
modalEditClose.addEventListener('click', () => {
    modalEdit.classList.remove('active');
});

// Cerrar modal Editar al hacer click fuera de la tarjeta 
modalEditOverlay.addEventListener('click', () => {
    modalEdit.classList.remove('active');
});

// ----------------------
// LÓGICA MODAL BORRAR
// ----------------------

// Abrir modal Borrar
btnDeletes.forEach(btn => {
    btn.addEventListener('click', () => {
        modalDelete.classList.add('active');
    });
});

// Cerrar modal Borrar al hacer click en la X
modalDeleteClose.addEventListener('click', () => {
    modalDelete.classList.remove('active');
});

// Cerrar modal Borrar al hacer click fuera de la tarjeta
modalDeleteOverlay.addEventListener('click', () => {
    modalDelete.classList.remove('active');
});