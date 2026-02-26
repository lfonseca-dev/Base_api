import { Router } from "express";
import ProdutoController from "../controllers/Produto.js";

const router = Router();

router.get("/", ProdutoController.getProduto);
router.get("/:id", ProdutoController.getProdutoById);
router.post("/", ProdutoController.addProdutos);
router.put("/:id", ProdutoController.updateProduto)
router.delete("/:id", ProdutoController.deleteProduto);

export default router;