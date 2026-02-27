import Produto from "../models/Produto.js";

const ProdutoController = {
  async getProduto(_, res) {
    try {
      const produtos = await Produto.getProdutos();

      if (!produtos || produtos.length === 0) {
            return res.status(404).json({ 
              status: 404, 
              msg: "Produtos não encontrados!",
            });
        }

      return res.status(200).json({
        status: 200,
        msg: "OK",
        data: produtos,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        data: error.message,
      });
    }
  },
  async getProdutoById(req, res) {
    try {
      const id = req.params.id;

      const produtos = await Produto.getProdutoById(id);

      if (!produtos) {
        return res.status(404).json({
          status: 404,
          msg: "Produto não encontrado!",
        });
      }

      return res.status(200).json({
        status: 200,
        msg: "OK",
        data: produtos,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        data: error.message,
      });
    }
  },

  async addProdutos(req, res) {
    try {
      const { descricao, bitola, peso, idCategoria } = req.body;

      if (!descricao || !bitola || !peso || !idCategoria) {
        return res.status(400).json({
          status: 400,
          msg: "Todos os campos devem ser preenchidos!",
        });
      }

      const pesoNumero = Number(peso);

      const pesoFormatado = parseFloat(pesoNumero.toFixed(3));

      const result = await Produto.addProduto(
        descricao,
        bitola,
        pesoFormatado,
        idCategoria,
      );

      return res.status(201).json({
        status: 201,
        msg: "Produto criado com sucesso!",
        data: result[0],
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        data: error.message,
      });
    }
  },
  async updateProduto(req, res) {
    try {
      const { descricao, bitola, peso, idCategoria } = req.body;
      const id = req.params.id;

      if (
        !descricao &&
        !bitola &&
        !peso &&
        !idCategoria 
      ) {
        return res.status(400).json({
          status: 400,
          msg: "O produto não foi alterado!",
        });
      }

      const produtos = await Produto.getProdutoById(id);

      if (!produtos) {
        return res.status(404).json({
          status: 404,
          msg: "Produto não encontrado!",
        });
      }

      const result = await Produto.updateProduto(
        descricao ?? produtos.descricao,
        bitola ?? produtos.bitola,
        peso ?? produtos.peso,
        idCategoria ?? produtos.idCategoria,
        id,
      );

      return res.status(200).json({
        status: 200,
        msg: "OK",
        data: result[0],
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        data: error.message,
      });
    }
  },

  async deleteProduto(req, res) {
    try {
      const id = req.params.id;

      const produtos = await Produto.getProdutoById(id);

      if (!produtos) {
        return res.status(400).json({
          status: 400,
          msg: "Produto não encontrado!",
        });
      }

      const result = await Produto.deleteProduto(id);

      return res.status(200).json({
        status: 200,
        msg: "OK",
        data: result[0],
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        data: error.message,
      });
    }
  },
}

export default ProdutoController;