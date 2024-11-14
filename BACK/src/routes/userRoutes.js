import express from "express";
import userController from "../controllers/userController.js";
import { verificarRol } from "../controllers/userController.js";

const router = express.Router();


router.get('/users', verificarRol(['admin', 'user']), userController.obtenerUsuarios);
router.get('/users/:id', verificarRol(['admin']), userController.obtenerUsuarioId);
router.post('/users', verificarRol(['admin']), userController.crearUsuario);
router.put('/user/:id', verificarRol(['admin']), userController.actualizarUsuario);
router.delete('/user/:id', verificarRol(['admin']), userController.borrarUsuarioId);

//ruta login
router.post('/login', userController.loginUsuario);

export default router;