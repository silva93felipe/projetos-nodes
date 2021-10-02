const ArtigoModel = require("../models/ArtigoModel");

exports.getAll = async (req, res) => {
    ArtigoModel.find({})
    .then((artigo) =>{
        return res.json(artigo);
    }).catch((err) =>{
        return res.status(400).json({
            error: true,
            message: "Nenhum artigo encontrado."
        });
    });
}

exports.getOne = async (req, res) =>{
    ArtigoModel.findOne({_id: req.params.id})
    .then((artigo)=>{
        res.json(artigo);
    }).catch((err) =>{
        res.status(400).json({
            error: true,
            message: 'Artigo não encontrado.'
        });
    });
}

exports.editar = async (req, res) =>{
    const artigo = ArtigoModel.findByIdAndUpdate({_id: req.params.id}, req.body, (err) =>{
        if(err){
            return res.status(400).json({
                error: true,
                message: 'Não foi possível editar.'
            });
        }
        return res.json({
            error: false,
            message: "Dados alterados com sucesso."
        });
    });
}

exports.delete = async (req, res) =>{
    const artigo = ArtigoModel.deleteOne({_id: req.params.id}, (err) =>{
        if(err) return res.status(400).json({
            error: true,
            message: 'Não foi possível apagar artigo.'
        })
        return res.json({
            error: false,
            message: 'Dado apagado com sucesso.'
        })
    })
}

exports.create = async (req, res) =>{
    const artigo = ArtigoModel.create(req.body, (err)=>{
        if (err){
            return res.status(400).json({
                error: true,
                message: "Falha ao cadastrar artigo"
            });
        }
        return res.status(200).json({
            error: false,
            message: "Cadastro efetuado com sucesso."
        });
    });
}