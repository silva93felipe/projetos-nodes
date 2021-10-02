const express = require('express');
const { Op } = require('sequelize')
const cors = require('cors');
const app = express();

const Lancamento = require("./models/Lancamento")

app.use(express.json());
app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-PINGOTHER")
    app.use(cors());
    next();
})

app.get("/listar/:mes/:ano", async (req, res) =>{
    var mes = new Number(req.params.mes);
    var ano = new Number(req.params.ano);
    
    const date = new Date(ano + "-" + mes);
    var primeiroDia = new Date(date.getFullYear(), date.getMonth(), 1)
    var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0)

    const lancamentos = await Lancamento.findAll({
        order: [["dataPagamento","ASC"]],
        where: {
            "dataPagamento" :{
                [Op.between]: [primeiroDia, ultimoDia],
            }
        }
    })

    const valorPagamentos = await Lancamento.sum("valor", {
        where: {
            tipo: '1',
            "dataPagamento": {
                [Op.between]: [primeiroDia, ultimoDia],
            }
        } 
    })
    
    const valorRecebido = await Lancamento.sum("valor", {
        where: {
            tipo: '2',
            "dataPagamento": {
                [Op.between]: [primeiroDia, ultimoDia],
            }
        }
    })

    const saldo = new Number(valorRecebido) - new Number(valorPagamentos)

    return res.json({
        erro: false,
        lancamentos,
        valorPagamentos,
        valorRecebido,
        saldo
    })
});

app.post("/cadastrar", async (req, res) =>{
    await Lancamento.create(req.body).then(()=>{
        return res.json({
            erro: false,
            mensagem: "Lançamento cadastrado"
        })
    }).catch(()=>{
        return res.status(400).json({
            erro: true,
            mensagem: "Erro ao lançar"
        })
    })
});

app.get("/visualizar/:id", async (req, res) =>{
    await Lancamento.findByPk(req.params.id).then((lancamento)=>{
        return res.json({
            erro: false,
            lancamento
        })
    }).catch(()=>{
        return res.status(400).json({
            erro: true,
            mensagem: "Erro lançamento não encontrado.  "
        })
    })
});

app.put("/editar", async (req, res) =>{
    var dados = req.body;
    await Lancamento.update(dados, {where: {id: dados.id}}).then((lancamento)=>{
        return res.json({
            erro: false,
            mensagem: "Lançamento editado com sucesso."
        })
    }).catch(()=>{
        return res.status(400).json({
            erro: true,
            mensagem: "Erro ao editar lançamento."
        })
    })
});

app.delete("/apagar/:id", async(req, res) =>{
    await Lancamento.destroy({where: {id:req.params.id}})
    .then(()=>{
        return res.json({
            erro: false,
            mensagem: "Registro deletado com sucesso."
        })
    }).catch(()=>{
        return res.status(400).json({
            erro: true,
            mensagem: "Erro ao deletar lançamento."
        })
    })
})

app.listen(8080, ()=>{
    console.log("Servidor ativo em: http://localhost:8080");
});
