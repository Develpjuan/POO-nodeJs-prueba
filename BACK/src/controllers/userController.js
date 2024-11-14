import User from "../models/user.js";

export const verificarRol = (roles) => {
    return (req, res, next) => {
        req.user = {
            id: 1,
            email: "admin@gmail.com",
            rol: "admin"
        };

        if(!roles.includes(req.user.rol)) {
            return res.status(403).json({ message: "No tienes permisos para realizar esta accion" });
        }

        next();
    };
};

const loginUsuario = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { user, permisos } = await User.login(email, password);
        res.status(200).json({
            message: "login exitoso",
            user: {
                id: user.id,
                nombre: user.nombre,
                email: user.email,
                rol: user.rol_id,
                permisos
            },
        });
    } catch(err) {
        res.status(400).send(err);
    }
};



const obtenerUsuarios = async (req, res) => {

    try {
        const usuarios = await User.obtenerUsuarios();
        res.status(200).json(usuarios);
    } catch(err) {
        res.status(500).send("Error al obtener los usuarios");
    }
};

const crearUsuario = async (req, res) => {
    const { nombre, email, password, rol_id } = req.body;

    try {
        const result = await User.crearUsuarios(nombre, email, password, rol_id);
        res.status(200).send("Usuario creado exitosamente");
    } catch(err) {
        res.status(500).send("Error al crear al usuario");
    }
};

const actualizarUsuario = async (req, res) => {
    const { nombre } = req.body;
    const { id } = req.params;
    const actualizarUser = new User(nombre);
    actualizarUser.id = id;

    try {  
        const result = await actualizarUser.actualizarUsuario();
        res.status(200).send("usuario actualizado exitosamente");
    } catch(err) {
        res.status(500).send("Error al actualizar el usuario")
    }
};

const obtenerUsuarioId = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.obtenerUsuarioId(id);
        if(!user) {
            return res.status(404).send("Usuario no encontrado");
        }
        res.status(200).json(user);
    } catch(err) {
        res.status(500).send("Error al obtener el usuario");
    }
}

const borrarUsuarioId = async (req, res) => {
    const { id } = req.params;

    try {
        //const result = await User.borrarUsuarioId(id);
        const result = await User.borrarUsuarioId(id);
        if(result.affectedRows === 0) {
            return res.status(404).send("Usuario no encontrado")
        }
        res.status(200).send("Usuario eliminado exitosamente");
    } catch(err) {
        res.status(500).send("Error al eliminar el usuario");
    }
}

export default {
    obtenerUsuarios,
    crearUsuario,
    actualizarUsuario,
    obtenerUsuarioId,
    borrarUsuarioId,
    loginUsuario
};