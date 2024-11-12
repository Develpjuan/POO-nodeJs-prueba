import express from "express";
import userController from "../controllers/userController.js"
const router = express.Router();


router.get('/users', userController.obtenerUsuarios);
router.get('/users/:id', userController.obtenerUsuarioId);
router.post('/users', userController.crearUsuario);
router.put('/user/:id', userController.actualizarUsuario);
router.delete('/user/:id', userController.borrarUsuarioId);

//ruta login
router.post('/login', userController.loginUsuario);

export default router;