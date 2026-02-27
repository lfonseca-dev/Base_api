import Categoria from "../models/Categoria.js";

const CategoriaController = {
    async getAllCategories(_, res){
        try{
            const categorias = await Categoria.getAllCategories();

            if(!categorias || categorias.length === 0){
                return res.status(404).json({
                    status: 404,
                    msg: "Categorias não encontradas!"
                });
            }

            return res.status(200).json({
                status: 200,
                msg: "OK",
                data: categorias
            })
        }catch (error){
            return res.status(500).json({
                status: 500,
                data: error.message,
            })
        }
    }
}

export default CategoriaController;