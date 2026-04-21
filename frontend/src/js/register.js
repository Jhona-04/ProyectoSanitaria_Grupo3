document.addEventListener('DOMContentLoaded', () => {
    const nombre = document.getElementById('nombre');
    const apellidos = document.getElementById('apellidos');
    const centro = document.getElementById('centro');
    const useremail = document.getElementById('useremail-reg');
    const password = document.getElementById('password-reg');
    const password2 = document.getElementById('password2');
    const registerForm = document.getElementById('register-form');

    const showError = (input, message) => {
        const errorElement = input.closest('.form__group').querySelector('.form__error-message');
        if (errorElement) {
            errorElement.textContent = message;
            input.classList.toggle('invalid', message !== '');
        }
    };

    // VALIDACIÓN NOMBRE
    if(nombre) {
        nombre.addEventListener('input', () => {
            if (nombre.validity.tooShort) {
                showError(nombre, 'El nombre debe tener al menos 2 caracteres.');
            } else if (nombre.validity.patternMismatch) {
                showError(nombre, 'El nombre solo puede contener letras y espacios.');
            } else {
                showError(nombre, '');
            }
        });
    }

    // VALIDACIÓN APELLIDOS
    if(apellidos) {
        apellidos.addEventListener('input', () => {
            if (apellidos.validity.tooShort) {
                showError(apellidos, 'Los apellidos deben tener al menos 2 caracteres.');
            } else if (apellidos.validity.patternMismatch) {
                showError(apellidos, 'Los apellidos solo pueden contener letras y espacios.');
            } else {
                showError(apellidos, '');
            }
        });
    }

    // VALIDACIÓN CENTRO
    if(centro) {
        centro.addEventListener('input', () => {
            if (centro.validity.tooShort) {
                showError(centro, 'El centro debe tener al menos 2 caracteres.');
            } else {
                showError(centro, '');
            }
        });
    }

    // VALIDACIÓN EMAIL
    if(useremail) {
        useremail.addEventListener('input', () => {
            if (useremail.validity.typeMismatch) {
                showError(useremail, 'Por favor, introduce un correo electrónico válido.');
            } else {
                showError(useremail, '');
            }
        });
    }

    // VALIDACIÓN CONTRASEÑA
    if(password) {
        password.addEventListener('input', () => {
            let message = '';
            if (password.validity.tooShort) {
                message = 'La contraseña debe tener al menos 8 caracteres.';
            } else if (password.validity.tooLong) {
                message = 'La contraseña no puede tener más de 16 caracteres.';
            } else if (password.validity.patternMismatch) {
                message = 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un símbolo.';
            }
            showError(password, message);
        });
    }

    // VALIDACIÓN REPETIR CONTRASEÑA
    if(password2) {
        password2.addEventListener('input', () => {
            let message = '';
            if (password.value !== password2.value) {
                message = 'Las contraseñas no coinciden.';
            }
            showError(password2, message);
        });
    }

    if(registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (password.value !== password2.value) {
                alert('Las contraseñas no coinciden.');
                return;
            }

            const userData = {
                nombre: nombre.value,
                apellidos: apellidos.value,
                email: useremail.value,
                password: password.value,
                rol: 0,
                centro: centro.value,
            };

            try {
                const response = await fetch('http://localhost:3000/sanitaria/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });

                const result = await response.json();

                if (response.ok) {
                    alert('¡Usuario registrado con éxito! Ahora puedes iniciar sesión.');
                    window.location.reload();
                } else {
                    alert(`Error al registrar: ${result.errores.join(', ')}`);
                }
            } catch (error) {
                console.error('Error de red o al conectar con el servidor:', error);
                alert('No se pudo conectar con el servidor. Revisa la consola para más detalles.');
            }
        });
    }
});
