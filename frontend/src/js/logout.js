// Lógica para cerrar sesión y borrar cookies/localStorage/sessionStorage

document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logout-button');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // Borrar cookies
            document.cookie.split(';').forEach(function(c) {
                document.cookie = c.trim().split('=')[0] + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/';
            });
            // Borrar localStorage y sessionStorage
            localStorage.clear();
            sessionStorage.clear();
            // Redirigir a login
            window.location.href = '../index.html';
        });
    }
});
