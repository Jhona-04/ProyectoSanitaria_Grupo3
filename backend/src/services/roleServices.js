const Rol = require("../database/models/Rol");

// Devuelve el id del rol 'usuario'
async function getDefaultUserRoleId(nombreRol = 'usuario') {
    const rol = await Rol.findOne({ where: { nombre: nombreRol } });
    if (!rol) throw new Error(`No existe el rol '${nombreRol}' en la tabla roles.`);
    return rol.idRol;
}

module.exports = { getDefaultUserRoleId };
