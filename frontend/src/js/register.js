document.addEventListener('DOMContentLoaded', () => {
    const nombre = document.getElementById('nombre');
    const apellidos = document.getElementById('apellidos');
    const centro = document.getElementById('centro');
    const useremail = document.getElementById('useremail');
    const password = document.getElementById('password');
    const password2 = document.getElementById('password2');

    const showError = (input, message) => {
        const errorElement = input.nextElementSibling;
        errorElement.textContent = message;
        input.classList.toggle('invalid', message !== '');
    };

    // VALIDACIÓN NOMBRE
    nombre.addEventListener('input', () => {
        if (nombre.validity.tooShort) {
            showError(nombre, 'El nombre debe tener al menos 2 caracteres.');
        } else if (nombre.validity.patternMismatch) {
            showError(nombre, 'El nombre solo puede contener letras y espacios.');
        } else {
            showError(nombre, '');
        }
    });

    // VALIDACIÓN APELLIDOS
    apellidos.addEventListener('input', () => {
        if (apellidos.validity.tooShort) {
            showError(apellidos, 'Los apellidos deben tener al menos 2 caracteres.');
        } else if (apellidos.validity.patternMismatch) {
            showError(apellidos, 'Los apellidos solo pueden contener letras y espacios.');
        } else {
            showError(apellidos, '');
        }
    });

    // VALIDACIÓN CENTRO
    centro.addEventListener('input', () => {
        if (centro.validity.tooShort) {
            showError(centro, 'El centro debe tener al menos 2 caracteres.');
        } else {
            showError(centro, '');
        }
    });

    // VALIDACIÓN EMAIL
    useremail.addEventListener('input', () => {
        if (useremail.validity.typeMismatch) {
            showError(useremail, 'Por favor, introduce un correo electrónico válido.');
        } else {
            showError(useremail, '');
        }
    });

    // VALIDACIÓN CONTRASEÑA
    password.addEventListener('input', () => {
        const errorElement = password.parentElement.nextElementSibling;
        let message = '';
        if (password.validity.tooShort) {
            message = 'La contraseña debe tener al menos 8 caracteres.';
        } else if (password.validity.tooLong) {
            message = 'La contraseña no puede tener más de 16 caracteres.';
        } else if (password.validity.patternMismatch) {
            message = 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un símbolo.';
        }
        errorElement.textContent = message;
        password.classList.toggle('invalid', message !== '');
    });

    // VALIDACIÓN REPETIR CONTRASEÑA
    password2.addEventListener('input', () => {
        const errorElement = password2.parentElement.nextElementSibling;
        let message = '';
        if (password.value !== password2.value) {
            message = 'Las contraseñas no coinciden.';
        }
        errorElement.textContent = message;
        password2.classList.toggle('invalid', message !== '');
    });
});
