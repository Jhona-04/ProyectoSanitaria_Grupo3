const userService = require('../services/userServices');
const { getDefaultUserRoleId } = require('../services/roleServices');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const { sendPasswordResetEmail } = require('../services/mailer');
const crypto = require('crypto');

// Controlador para registrar un nuevo usuario
const register = async (req, res) => {
    const { email, password, centro, nombre, apellidos } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            error: "Error de autenticación",
            errores: ["Email y contraseña requeridos"],
        });
    }
    try {
        // Obtener idRol del rol 'usuario' por defecto
        const idRolDefault = await getDefaultUserRoleId('usuario');
        await userService.validateUserModel(email, password, centro, idRolDefault, nombre, apellidos);

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await userService.createUser(email, hashedPassword, centro, idRolDefault, nombre, apellidos);
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
        await userService.validateLoginModel(email, password);
        const user = await userService.findUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                error: "Error de autenticación",
                errores: ["El usuario o la contraseña son incorrectos"],
            });
        }

        // Comprobamos contraseña
        if (!user.password) {
            return res.status(401).json({
                error: "Error de autenticación",
                errores: ["El usuario o la contraseña son incorrectos"],
            });
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({
                error: "Error de autenticación",
                errores: ["El usuario o la contraseña son incorrectos"],
            });
        }

        let expiresInValue = process.env.JWT_DURATION;

        if (/^\d+$/.test(expiresInValue)) {
            expiresInValue = expiresInValue + 'h';
        }
        const token = jwt.sign(
            {
                userId: user.idUsuario,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: expiresInValue
            }
        );

        //Respuesta con token
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
    if (!email) {
        return res.status(400).json({
            error: "Error",
            errores: ["Email requerido"],
        });
    }
    try {
        const user = await userService.findUserByEmail(email);

        if (!user) {
            // No revelamos si el usuario existe o no por seguridad
            return res.status(200).json({ message: "Si el email está registrado, recibirás un correo de restablecimiento." });
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpires = Date.now() + 3 * 60 * 60 * 1000; // 3 horas

        await userService.saveResetToken(email, resetToken, resetTokenExpires);
        await sendPasswordResetEmail(email, resetToken);

        res.status(200).json({ message: "Si el email está registrado, recibirás un correo de restablecimiento." });

    } catch (error) {
        res.status(500).json({ error: "Error en el servidor", errores: [error.message] });
    }
};

const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
        console.log('Error: No se proporcionó contraseña.');
        return res.status(400).json({
            error: "Error",
            errores: ["Nueva contraseña requerida"],
        });
    }

    try {
        const user = await userService.findUserByResetToken(token);

        if (!user) {
            console.log('Error: Usuario no encontrado con ese token o el token ya fue usado.');
            return res.status(400).json({
                error: "Error",
                errores: ["El token es inválido o ha expirado"],
            });
        }

        if (user.resetPasswordExpires < Date.now()) {
            console.log('Error: El token ha expirado.');
            return res.status(400).json({
                error: "Error",
                errores: ["El token es inválido o ha expirado"],
            });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await userService.updatePassword(user.idUsuario, hashedPassword);

        await userService.clearResetToken(user.idUsuario);

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
