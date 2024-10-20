const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const server = express();
server.use(express.json());
server.use(cors());

const dadosPath = path.join(__dirname, 'data', 'usuario.json');

function carregarDados() {
    return require(dadosPath);
}
let dados = carregarDados();

server.listen(3000, () => {
    console.log("Servidor rodando na porta 3000.");
});

server.get('/usuario', (req, res) => {
    return res.json(dados.Usuarios);
});

server.put('/usuario/:id', (req, res) => {
    const usuarioId = parseInt(req.params.id);
    const atualizarUser = req.body;

    const indiceUsuario = dados.Usuarios.findIndex(u => u.id === usuarioId);

    if (indiceUsuario === -1) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
    } else {
        dados.Usuarios[indiceUsuario] = { ...dados.Usuarios[indiceUsuario], ...atualizarUser };
        salvarDados();
        return res.status(200).json({ mensagem: "Dados atualizados com sucesso!" });
    }
});

server.post('/usuario', (req, res) => {
    const { nome, email, senha } = req.body;
    
    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" });
    } else {
        const novoUsuario = {
            id: dados.Usuarios.length + 1,
            nome: nome,
            email: email,
            senha: senha,
            niveis: {
                "exercicios-base": 0,
                "exercicios-estrutura": 0,
                "exercicios-musical": 0
            }
        };

        dados.Usuarios.push(novoUsuario);
        salvarDados();

        return res.status(201).json({ mensagem: "Cadastro feito com sucesso" });
    }
});

server.delete('/usuario/:id', (req, res) => {
    const id = parseInt(req.params.id);

    dados.Usuarios = dados.Usuarios.filter(u => u.id !== id);
    salvarDados();
    
    return res.status(200).json({ mensagem: "Usuário excluído" });
});

function salvarDados() {
    try {
        fs.writeFileSync(dadosPath, JSON.stringify(dados, null, 2));
    } catch (error) {
        console.error('Erro ao salvar dados:', error);
    }
}