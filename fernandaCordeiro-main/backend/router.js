const express = require('express')
const router = express.Router()
const db = require('./db')

//GET - Listar usuários
router.get('/usuarios', async (req, res) => {
    try {
        const sql = 'select id, nome, cpf, telcel, email from tbusuarios order by id desc'
        const [rows] = await db.query(sql)
        res.json(rows)
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao buscar usuários do banco.' })
    }
})

//POST - Criar usuário
router.post('/usuarios', async (req, res) => {
    const { nome, email } = req.body || {}
    if (!nome || !cpf || !telcel || !email )
        return res.status(400).
            json({ erro: 'todos os dados são obrigatórios.' })
    try {
        const sql = 'insert into tbusuarios( nome, cpf, telcel, email)values(?,?,?,?)'
        const [result] = await db.query(sql, [nome, email])
        res.status(201).json({ id: result.insertId, nome, cpf, telcel, email })
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY')
            return res.status(400)
                .json({ erro: 'dados já estão cadastrado ' })
        res.status(500).json({ erro: 'Erro ao salvar no banco.' })
    }
})

//PUT - Alterar usuário
router.put('/usuarios/:id', async (req, res) => {
    const { id } = req.params
    const { nome, cpf, telcel, email } = req.body

    try {
        const sql = 'update tbusuarios set nome=?, cpf=?, telcel=?, email=? where id=?'
        const [result] = await db.query(sql, [nome, cpf, telcel, email, id])
        if (result.affectedRows === 0)
            return res.status(404)
                .json({ erro: 'Usuário não encontrado.' })
        res.json({ mensagem: 'Usuário alterado com sucesso!' })
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY')
            return res.status(400).json({ erro: 'Este dados já estão em uso.' })
        res.status(500).json({ erro: 'Erro ao atualizar no banco.' })
    }
})

//Delete - Excluindo usuário
router.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params
    try {
        const sql = 'delete from tbusuarios where id=?'
        const [result] = await db.query(sql, [id])
        if (result.affectedRows === 0)
            return res.status(404)
                .json({ erro: 'Usuário não encontrado.' })
        res.json({ mensagem: 'Usuário deletado com sucesso!' })
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao deletar do banco.' })
    }
})


module.exports = router