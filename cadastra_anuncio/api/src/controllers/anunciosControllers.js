const Anuncio = require('../models/Anuncio');
const upload = require('../middlewares/uploadImgAnuncio')

exports.getAll =  async  (req, res) =>{
    await Anuncio.findAll({ order: [['id', 'DESC']]}).then((anuncios) =>{
        var endImagem = "http://localhost:8080/files/anuncios/";
        var endImagemIp = "http://10.0.0.111:8080/files/anuncios/";
        res.json({
            error: false,
            anuncios,
            endImagem,
            endImagemIp
        })
    })
}

exports.getOnde = async (req, res) =>{
    await Anuncio.findByPk(req.params.id)
    .then(anuncio =>{
        if(anuncio.imagem){
            var endImagem = "http://localhost:8080/files/anuncios/" + anuncio.imagem
            var endImagemIp = "http://10.0.0.111:8080/files/anuncios/" + anuncio.imagem
        } else{
            var endImagem = "http://localhost:8080/files/anuncios/img_padrao.png"
            var endImagemIp = "http://10.0.0.111:8080/files/anuncios/img_padrao.png"
        }

        return res.json({
            error: false,
            anuncio,
            endImagem,
            endImagemIp
        })
    }).catch(error =>{
        return res.status(400).json({
            error: true,
            message: 'Não encontrado...'
        })
    })
}

exports.edit = async (req, res) =>{
    await Anuncio.update(req.body,{
        where: {id: req.body.id}
    }).then(() =>{
        return res.json({
            error: false,
            message: "Editado com sucesso."
        })
    }).catch(err =>{
        return res.status(400).json({
            error: true,
            message: 'Falha ao editar.'
        })
    })
}

exports.editImg = upload.single('imagem'), async (req, res) =>{
    if(req.file){

        await Anuncio.findByPk(req.params.id).then(anuncio => {
            const imgAntiga = './public/upload/anuncios/' + anuncio.dataValues.imagem;

            fs.access(imgAntiga, (err) =>{
                if(!err){
                    fs.unlink(imgAntiga, () =>{})
                }
            });
        }).catch((err) =>{
            return res.status(400).json({
                error: true,
                message: "Erro: Anúnio não encontrado."
            })
        })

        await Anuncio.update({ imagem: req.file.filename }, { where: { id: req.params.id }}).
        then(() =>{
            return res.json({
                error: false,
                message: "Imagem do anúncio editada com sucesso!"
            });
        }).catch((err)=>{
            return res.status(400).json({
                error: true,
                message: "Erro: Não foi possível editar imagem."
            })
        })
    }else{
        return res.status(400).json({
            error: true,
            message: "Erro: Selecione uma imagem válida."
        })
    }
}

exports.create = async (req, res) =>{
    const anuncio = await Anuncio.create(
        req.body
    ).then(()=>{
        return res.json({
            error: false,
            message: "Cadastrado com sucesso!"
        });
    }).catch((err) =>{
        return res.status(400).json({
            error: true,
            message: "Erro ao cadastrar!"
        });
    });
}

exports.delete = async (req, res) =>{
    await Anuncio.destroy({
        where: {id: req.params.id}
    }).then(() =>{
        return res.json({
            error: false,
            message: "Apagado com sucesso."
        })
    }).catch(err =>{
        return res.status(400).json({
            error: true,
            message: 'Falha ao apagar.'
        })
    })
}