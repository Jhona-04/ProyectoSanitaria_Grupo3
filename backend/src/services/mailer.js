const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendPasswordResetEmail = async (to, token) => {
    const resetUrl = `http://127.0.0.1:5500/frontend/src/pages/resetPassword.html?token=${token}`;
    const mailOptions = {
        from: `"Administrador" <${process.env.EMAIL_USER}>`,
        to: to,
        subject: 'Restablecimiento de contraseña',
        html: `
            <p>Has solicitado un restablecimiento de contraseña.</p>
            <p>Haz clic en este <a href="${resetUrl}">enlace</a> para restablecer tu contraseña.</p>
            <p>Si no has sido tú, ignora este correo.</p>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado con éxito a través de Gmail. Respuesta del servidor:', info.response);
    } catch (error) {
        console.log("error: "+ error)
    }
};

module.exports = {
    sendPasswordResetEmail,
};
