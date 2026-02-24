import Usuario from '../models/Usuario.js';
import bcrypt from "bcrypt";

const UsuarioController = {
    async getUsers(_, res){
        try{
            const users = await Usuario.getUsers();

            return res.status(200).json({
                status: 200,
                data: users[0],
            });
        }catch (error){
            res.status(500).json({
                status: 500,
                data: error.message,
            });
        }
    },

    async addUser(req, res){
        try{
            const {nome, email, senha} = req.body;

            if (!nome ||!email||!senha){
                return res.status(400).json({
                    status: 400,
                    msg: "Todos os campos devem ser preenchidos!",
                });
            }

            const senhacript = await bcrypt.hash(senha, 12);

            const result = await Usuario.addUser(nome, email, senhacript);

            return res.status(201).json({
                status: 201,
                msg: "Usuário criado com sucesso!",
                data: result,
            })
        }catch (error){
            res.status(500).json({
                status: 500,
                data: error.message,
            });
        }
    },

    async getUserById(req, res){
        try{
            const id = req.params.id;

            const user = await Usuario.getUserById(id);

            if(!user){
                return res.status(404).json({
                    status: 404,
                    msg: "Usuário não encontrado!",
                });
            }

            return res.status(200).json({
                status: 200,
                data: user,
            });
        }catch (error){
            res.status(500).json({
                status: 500,
                data: error.message
            });
        } 
    },

    async updateUser(req, res){
        try{
            const {nome, email, senha} = req.body;
            const id = req.params.id;

            if (!nome && !email && !senha){
                return res.status(400).json({
                    status: 400,
                    msg: "Nenhum campo foi enviado para atualizar!"
                })
            }

            const user = await Usuario.getUserById(id);

            if (!user){
                 return res.status(404).json({
                    status: 404,
                    msg: "Usuário não encontrado!"
                })
            }

            let novoNome = nome ?? user.nome ?? null;
            let novoEmail = email ?? user.email;
            let novaSenha = user.senha;

            novaSenha = await bcrypt.hash(senha, 12);

            const result = await Usuario.updateUser(novoNome.trim(), novoEmail, novaSenha, id);

            return res.status(200).json({
                status: 200,
                msg: "Usuário atualizado com sucesso!",
                data: result,
            })
        }catch (error){
            return res.status(500).json({
                status: 500,
                data: error.message,
            })
        }
    },

    async deleteUser(req, res){
        try{
            const id = req.params.id;

            const user = await Usuario.getUserById(id);

            if (!user){
                 return res.status(404).json({
                    status: 404,
                    msg: "Usuário não encontrado!"
                })
            }

            const result = await Usuario.deleteUser(id);

            return res.status(200).json({
                status: 200,
                msg: "Usuário deletado com sucesso!",
                data: result,
            });
        }catch (error) {
            res.status(500).json({
                status: 500,
                data: error.message,
            })
        }
    },
}

export default UsuarioController;