import { Router } from "express";
import UsuarioController from "../controllers/Usuario.js";

const router = Router();

router.get('/', UsuarioController.getUsers);
router.post('/', UsuarioController.addUser);
router.get('/:id', UsuarioController.getUserById);
router.put('/:id', UsuarioController.updateUser);
router.delete('/:id', UsuarioController.deleteUser);
export default router;