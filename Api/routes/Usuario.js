import { Router } from "express";
import UsuarioController from "../controllers/Usuario.js";
import authToken from "../middleware.js"

const router = Router();

router.get("/auth/validate", authToken, (req, res) =>{
    res.json({
        msg: "Token válido",
        user: req.user
    });
})

router.get('/', UsuarioController.getUsers);
router.post('/', UsuarioController.addUser);
router.get('/:id', UsuarioController.getUserById);
router.put('/:id', UsuarioController.updateUser);
router.delete('/:id', UsuarioController.deleteUser);
router.post("/login", UsuarioController.authentication);

export default router;