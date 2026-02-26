import pool from "../db/pool";

const Produto = {
     async getProdutos() {
    try {
      const produtos = await pool.promise().execute(`SELECT * FROM produto;`);

      return produtos;
    } catch (error) {
      throw error;
    }
  },
  async getProdutoById(id) {
    try {
      const [produto] = await pool
        .promise()
        .execute(`SELECT * FROM produto WHERE id = ?`, [id]);

      return produto[0];
    } catch (error) {
      throw error;
    }
  },

  async addProduto(descricao, bitola, peso, idCategoria) {
    try {
      const result = await pool
        .promise()
        .execute(
          `INSERT INTO produto (descricao, bitola, peso idcategoria) VALUES(?, ?, ?, ?)`,
          [descricao, bitola, peso, idCategoria],
        );

      return result;
    } catch (error) {
      throw error;
    }
  },

  async updateProduto(descricao, bitola, peso, idCategoria, id) {
    try {
      const result = await pool
        .promise()
        .execute(
          `UPDATE produto SET descricao=?, bitola=?, peso=?, idCategoria=? WHERE id=?`,
          [descricao, bitola, peso, idCategoria, id],
        );

      return result;
    } catch (error) {
      throw error;
    }
  },
  async deleteProduto(id) {
    try {
      const result = await pool
        .promise()
        .execute(`DELETE FROM produto WHERE id = ?`, [id]);
      return result;
    } catch (error) {
      throw error;
    }
  },

}

export default Produto;