const express = require('express')
const routes = express.Router()


let db = [
    { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João" },
    { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans" },
    { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé" },
    { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps" },
    { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé" }]



routes.get('/produtos', (req, res) => {
    return res.json(db)
})

routes.get('/produtos/:id', (req, res) => {

    const produto = req.params.id
    const atual = db[produto-1]

    if(atual)
    return res.status(200).json(atual)

    return res
        .status(404)
        .json({error:`Produto não encontrado`})
})


routes.post('/produtos', (req, res) => {
    const body = req.body

    if (!body)
        return res.status(400).end()

    db.push(body)
    return res.json(body)
})

routes.put('/produtos/:id',(req,res)=>{
    const body = req.body
    const produto = req.params.id
    const atual = db[produto-1]

    if(!atual){
        return res
        .status(404)
        .json({error:`Produto não encontrado`})
    }

    if(body.id){
        return res
        .status(400)
        .json({error:`Id não pode ser alterado`})   
    }

    if(body.descricao){
        atual.descricao = body.descricao
    }
    if(body.valor){
        atual.valor = body.valor
    }
    if(body.marca){
        atual.marca = body.marca
    }

    return res.status(201).json(atual)

})


routes.delete('/produtos/:id', (req, res) => {
    const id = req.params.id
    const produto = db[id-1]

    if(!produto)
    return res.status(404).json(`Produto não encontrado`)

    delete db[id]
    return res.status(203);
})

module.exports = routes