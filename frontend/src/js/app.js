// Menú Hamburguesa
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
const crear_cassete = document.getElementById('crear_cassete');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menu.classList.toggle('active');
});


// ELEMENTOS
const tabla = document.getElementById('tablaCassetes');
const tbody = tabla.querySelector('tbody');

const selectOrgano = document.getElementById('organos');
const startDate = document.getElementById('start-date');
const endDate = document.getElementById('end-date');

// ----------------------
// FORMATEAR FECHA
// ----------------------
const formatearFecha = (fechaStr) => {
    const fecha = new Date(fechaStr);
    return String(fecha.getDate()).padStart(2, '0') + '-' +
        String(fecha.getMonth() + 1).padStart(2, '0') + '-' +
        fecha.getFullYear();
}

// ----------------------
// FILTRAR DATOS
// ----------------------
const aplicarFiltros = (data) => {
    let resultado = [...data];

    const organo = selectOrgano.value;
    const fechaInicio = startDate.value;
    const fechaFin = endDate.value;

    // FILTRO ÓRGANO
    if (organo && organo !== '*') {
        resultado = resultado.filter(item => item.organo === organo);
    }

    // FILTRO FECHAS
    if (fechaInicio) {
        const inicio = new Date(fechaInicio);
        resultado = resultado.filter(item => new Date(item.fecha) >= inicio);
    }

    if (fechaFin) {
        const fin = new Date(fechaFin);
        resultado = resultado.filter(item => new Date(item.fecha) <= fin);
    }

    return resultado;
}

// ----------------------
// PINTAR TABLA
// ----------------------
const renderTabla = (data) => {
    tbody.innerHTML = '';

    const fragment = document.createDocumentFragment();

    data.forEach(item => {
        const tr = document.createElement('tr');

        const tdFecha = document.createElement('td');
        tdFecha.textContent = formatearFecha(item.fecha);

        const tdDesc = document.createElement('td');
        tdDesc.textContent = item.descripcion;

        const tdOrg = document.createElement('td');
        tdOrg.textContent = item.organo;

        const tdBtn = document.createElement('td');
        const btn = document.createElement('button');

        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-file-lines';

        btn.appendChild(icon);
        tdBtn.appendChild(btn);

        tr.appendChild(tdFecha);
        tr.appendChild(tdDesc);
        tr.appendChild(tdOrg);
        tr.appendChild(tdBtn);

        fragment.appendChild(tr);
    });

    tbody.appendChild(fragment);
}

// ----------------------
// CARGAR DATOS
// ----------------------
const cargarCassetes = async () => {
    try {
        const res = await fetch('http://localhost:3000/sanitaria/cassetes');
        let data = await res.json();
        console.log('Datos obtenidos:', data);
        data = aplicarFiltros(data);

        renderTabla(data);

    } catch (error) {
        console.error('Error:', error);
    }
}

const crearCassete = async (casseteData) => {
    try {
        const res = await fetch('http://localhost:3000/sanitaria/cassetes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(casseteData)
        });

        if (res.ok) {
            console.log('Cassete creado con éxito');
            cargarCassetes();
        } else {
            console.error('Error al crear cassete');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
// ----------------------
// VALIDACIÓN FORMULARIO NUEVO CASSETTE
// ----------------------
const modalForm = document.getElementById('crear_cassete');
const modalDesc = document.getElementById('modal-desc');
const modalFecha = document.getElementById('modal-fecha');
const modalOrgano = document.getElementById('modal-organo');

const showError = (input, message) => {
    const errorElement = input.parentElement.querySelector('.form__error-message');
    if (errorElement) {
        errorElement.textContent = message;
        input.classList.toggle('invalid', message !== '');
    }
};

if(modalDesc) {
    modalDesc.addEventListener('input', () => {
        if (modalDesc.validity.tooShort) {
            showError(modalDesc, 'La descripción debe tener al menos 2 caracteres.');
        } else if (modalDesc.validity.valueMissing) {
            showError(modalDesc, 'Este campo es obligatorio.');
        } else {
            showError(modalDesc, '');
        }
    });
}

if(modalFecha) {
    modalFecha.addEventListener('input', () => {
        if (modalFecha.validity.valueMissing) {
            showError(modalFecha, 'Debes seleccionar una fecha.');
        } else {
            showError(modalFecha, '');
        }
    });
}

if(modalOrgano) {
    modalOrgano.addEventListener('input', () => {
        if (modalOrgano.validity.valueMissing) {
            showError(modalOrgano, 'Debes seleccionar un órgano.');
        } else {
            showError(modalOrgano, '');
        }
    });
}

// ----------------------
// EVENTOS
// ----------------------
document.addEventListener('DOMContentLoaded', () => {
    cargarCassetes();
});

// Cuando cambian filtros
selectOrgano.addEventListener('change', cargarCassetes);
startDate.addEventListener('change', cargarCassetes);
endDate.addEventListener('change', cargarCassetes);

// ----------------------
// MODAL CREAR CASSETTE
// ----------------------
const modal = document.getElementById('modal');
const btnNuevo = document.getElementById('cassette__modal');
const modalClose = document.getElementById('modal-close');
const modalOverlay = document.getElementById('modal-overlay');

// Abrir modal
btnNuevo.addEventListener('click', () => modal.classList.add('active'));
// Cerrar modal al hacer click
modalClose.addEventListener('click', () => modal.classList.remove('active'));
// Cerrar modal al hacer click fuera de la tarjeta
modalOverlay.addEventListener('click', () => modal.classList.remove('active'));

crear_cassete.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validar antes de enviar
    if (!modalForm.checkValidity()) {
        // Forzar la visualización de errores si el usuario intenta enviar un form inválido
        if (modalDesc.validity.valueMissing || modalDesc.validity.tooShort) {
            showError(modalDesc, 'La descripción debe tener al menos 2 caracteres.');
        }
        if (modalFecha.validity.valueMissing) {
            showError(modalFecha, 'Debes seleccionar una fecha.');
        }
        if (modalOrgano.validity.valueMissing) {
            showError(modalOrgano, 'Debes seleccionar un órgano.');
        }
        return; // Detener si el formulario no es válido
    }

    console.log('Formulario enviado');

    // Usamos 'e.target' que es el formulario actual
    const formData = new FormData(e.target);
    const casseteData = Object.fromEntries(formData.entries());

    // Ahora sí verás los datos porque añadimos los 'name' en el HTML
    console.log('Datos a enviar:', casseteData);

    crearCassete(casseteData);

    // Limpiar usando la variable correcta
    e.target.reset();

    // Cerrar modal (asegúrate de que la variable 'modal' exista arriba)
    if (document.getElementById('modal')) {
        document.getElementById('modal').classList.remove('active');
    }
});

// ----------------------
// MODAL BORRAR CASSETTE
// ----------------------
const modalDelete = document.getElementById('modal-delete');
const btnDeleteCassette = document.getElementById('btn-delete-cassette');
const modalDeleteClose = document.getElementById('modal-delete-close');
const modalDeleteOverlay = document.getElementById('modal-delete-overlay');

// Abrir modal
btnDeleteCassette.addEventListener('click', () => {
    modalDelete.classList.add('active');
});

// Cerrar modal al hacer click
modalDeleteClose.addEventListener('click', () => {
    modalDelete.classList.remove('active');
});

// Cerrar modal al hacer click fuera de la tarjeta
modalDeleteOverlay.addEventListener('click', () => {
    modalDelete.classList.remove('active');
});