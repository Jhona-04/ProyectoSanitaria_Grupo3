const userService = require('../services/userServices');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const { sendPasswordResetEmail } = require('../services/mailer');
const crypto = require('crypto');

// Controlador para registrar un nuevo usuario
const register = async (req, res) => {
    const { email, password, centro, rol, nombre, apellidos } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            error: "Error de autenticación",
            errores: ["Email y contraseña requeridos"],
        });
    }
    try {
        await userService.validateUserModel(email, password, centro, rol,nombre, apellidos);

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await userService.createUser(email, hashedPassword, centro, rol, nombre, apellidos);
        if (!newUser) {
            return res.status(500).json({
                error: "Error en el servidor",
                errores: ["No se pudo crear el usuario"]
            });
        }
        res.status(201).json({
            message: "Usuario registrado",
            data: { email: newUser.email },
        });
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            const errores = error.errors.map((error) => error.message);
            return res.status(400).json({ error: "Error de validación", errores });
        }
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({
                error: "Error de validación",
                errores: ["El email ya está registrado o no es válido"],
            });
        }
        res.status(500).json({ error: "Error en el servidor", errores: [error.message] });
    }
};

// Controlador para login de usuario
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            error: "Error de autenticación",
            errores: ["Email y contraseña requeridos"],
        });
    }
    try {
        await userService.validateUserModel(email, password);
        const user = await userService.findUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                error: "Error de autenticación",
                errores: ["El usuario o la contraseña son incorrectos"],
            });
        }
        // Comprobamos contraseña
        const isValid = await bcrypt.compare(password, user.password_user);
        if (!isValid) {
            return res.status(401).json({
                error: "Error de autenticación",
                errores: ["El usuario o la contraseña son incorrectos"],
            });
        }

        const token = jwt.sign(
            {
                userId: user.id_user,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_DURATION + 'h' 
            }
        );

        //Respuesta con token
        //Que tenemos que guardar o en sesionstorage o en cookies
        res.status(200).json({
            message: "Login correcto",
            token: token,
            data: { email: user.email },
        });
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            const errores = error.errors.map((error) => error.message);
            return res.status(400).json({ error: "Error de validación", errores });
        }
        res.status(500).json({ error: "Error en el servidor", errores: [error.message] });
    }
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    console.log('1. Solicitud de restablecimiento para:', email); // Registro para depuración
    if (!email) {
        return res.status(400).json({
            error: "Error",
            errores: ["Email requerido"],
        });
    }
    try {
        const user = await userService.findUserByEmail(email);
        console.log('2. Usuario encontrado:', user ? user.email : 'No encontrado'); // Registro para depuración

        if (!user) {
            // No revelamos si el usuario existe o no por seguridad
            return res.status(200).json({ message: "Si el email está registrado, recibirás un correo de restablecimiento." });
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        console.log('3. Token generado:', resetToken); // Registro para depuración
        const resetTokenExpires = Date.now() + 3600000; // 1 hour

        await userService.saveResetToken(email, resetToken, resetTokenExpires);
        console.log('4. Token guardado en la BD.'); // Registro para depuración
        await sendPasswordResetEmail(email, resetToken);
        console.log('5. Función sendPasswordResetEmail llamada.'); // Registro para depuración

        res.status(200).json({ message: "Si el email está registrado, recibirás un correo de restablecimiento." });

    } catch (error) {
        console.error('ERROR en forgotPassword:', error); // Registro de error
        res.status(500).json({ error: "Error en el servidor", errores: [error.message] });
    }
};

const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({
            error: "Error",
            errores: ["Nueva contraseña requerida"],
        });
    }

    try {
        const user = await userService.findUserByResetToken(token);

        if (!user || user.resetTokenExpires < Date.now()) {
            return res.status(400).json({
                error: "Error",
                errores: ["El token es inválido o ha expirado"],
            });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await userService.updatePassword(user.id_user, hashedPassword);
        await userService.clearResetToken(user.id_user);

        res.status(200).json({ message: "Contraseña actualizada correctamente." });

    } catch (error) {
        res.status(500).json({ error: "Error en el servidor", errores: [error.message] });
    }
};

module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword,
};
