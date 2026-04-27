document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-reset');
    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const btnReset = document.getElementById('btn-reset-submit');

    const generalErrorMessage = document.getElementById('general-error-message');
    const generalSuccessMessage = document.getElementById('general-success-message');

    const showError = (message) => {
        generalErrorMessage.textContent = message;
        generalErrorMessage.style.display = 'block';
    };

    const hideError = () => {
        generalErrorMessage.textContent = '';
        generalErrorMessage.style.display = 'none';
    };

    const showSuccess = (message) => {
        generalSuccessMessage.textContent = message;
        generalSuccessMessage.style.display = 'block';
    };

    const hideSuccess = () => {
        generalSuccessMessage.textContent = '';
        generalSuccessMessage.style.display = 'none';
    };

    const getQueryParam = (param) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    };

    const token = getQueryParam('token');
    if (!token) {
        showError('Token no proporcionado. No puedes restablecer la contraseña.');
        btnReset.disabled = true;
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        hideError();
        hideSuccess();

        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (newPassword !== confirmPassword) {
            showError('Las contraseñas no coinciden.');
            return;
        }

        if (!token) {
            showError('Falta el token de restablecimiento.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/sanitaria/users/reset-password/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password: newPassword }),
            });

            const result = await response.json();

            if (response.ok) {
                showSuccess(result.message || 'Contraseña actualizada con éxito.');
                setTimeout(() => {
                    window.location.href = '../index.html';
                }, 2000);
            } else {
                showError(result.errores ? result.errores.join(', ') : 'Error al restablecer la contraseña.');
            }
        } catch (error) {
            console.error('Error en la solicitud de restablecimiento:', error);
            showError('Ocurrió un error en el servidor. Inténtalo de nuevo más tarde.');
        }
    });
});
