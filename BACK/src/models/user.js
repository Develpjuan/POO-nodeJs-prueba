import connection from "../db/connection.js";
import bcrypt from "bcrypt";

class user {
    constructor(nombre, email, password) {
        this.nombre = nombre;
        this.email = email;
        this.password = password;
    }

    static async login(email, password) {
        const query = 'SELECT * FROM usuarios WHERE email = ?';

        return new Promise((resolve, reject) => {
            connection.query(query, [email], async (err, result) => {
                if(err) {
                    return reject(err)
                }
                if(result.length === 0) {
                    return reject("Ususario no encontrado");
                }

                const user = result[0];
                console.log(user);
                const isMatch = await bcrypt.compare(password, user.password);

                if(!isMatch) {
                    return reject("contraseña incorrecta")
                }

                const permisosQuery = `
                    SELECT p.nombre AS permiso
                    FROM roles r
                    JOIN rol_permisos rp ON r.id = rp.rol_id
                    JOIN permisos p ON rp.permiso_id = p.id
                    WHERE r.id = ?;
                `

                connection.query(permisosQuery, [user.rol_id], (err, permisosResult) => {
                    if(err) {
                        return reject(err);
                    }


                    const permisos = permisosResult.map(permiso => permiso.permiso);

                    resolve({ user, permisos });
                });
            });
        });
    }

    static async obtenerUsuarios() {
        const query = 'SELECT * FROM usuarios';

        try {
            const [result] = await connection.promise().query(query);
            return result;
        } catch(err) {
            throw err;
        }
    }

    static async crearUsuarios(nombre, email, password, rol_id) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const query = 'INSERT INTO usuarios (nombre, email, password, rol_id) VALUES (?, ?, ?, ?)';

        return new Promise((resolve, reject) => {
            connection.query(query, [nombre, email, hashedPassword, rol_id], (err, result) => {
                if(err) {
                    return reject(err);
                }
                resolve(result);
            });
            
        });
    }

    async actualizarUsuario() {
        const query = 'UPDATE usuarios SET nombre = ? WHERE id = ?'

        return new Promise((resolve, reject) => {
            connection.query(query, [this.nombre, this.id], (err, result) => {
                if(err) {
                    return reject(err)
                }
                resolve(result)
            })
        })
    }

    static async obtenerUsuarioId(id) {
        const query = 'SELECT * FROM usuarios WHERE id = ?';

        try {
            const [result] = await connection.promise().query(query, [id]);
            if(result.length === 0) {
                throw new Error("usuario no encontrado")
            }
            return result[0];
        } catch(err) {
            throw err;
        }
    }

    static async borrarUsuarioId(id) {
        const query = 'DELETE FROM usuarios WHERE id = ?';

        return new Promise((resolve, reject) => {
            connection.query(query, [id], (err, result) => {
                if(err) {
                    return reject(err)
                }
                resolve(result);
            })
        })
    }
}

export default user;