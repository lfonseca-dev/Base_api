import pool from "../db/pool";

const Categoria = {
    async getAllCategories(){
        try{
            const [categories] = await pool.promise().execute(`SELECT * FROM categoria`);

            return [categories];
        }catch(error){
            throw error;
        }
    }
}

export default Categoria;