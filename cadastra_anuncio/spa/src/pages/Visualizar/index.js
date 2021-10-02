import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import { Container, Alert } from 'reactstrap'
import api from '../../config';

export const Visualizar = ( props )=>{

    // console.log(props.match.params.id);

    const [data, setData] = useState([]);
    const [id] = useState(props.match.params.id);
    const [dataImg, setDataImg] = useState();

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    useEffect(() =>{
        const getAnuncio = async () => {
            await api.get("/anuncios/" + id)
            .then((res) =>{
                // console.log(res.data.anuncio);
                setData(res.data.anuncio) 
                setDataImg(res.data.endImagem)
            })
            .catch(()=>{
                setStatus({
                    type: "error",
                    mensagem: "Erro: tente mais tarde."
                })
            })
        }

        getAnuncio();
    }, [id])


    return(
        <div>
            <Container>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h1>Visualizar o Anúncios</h1>
                    </div>

                    <div className="mx-auto p-3">
                        <Link to={"/"} className="btn btn-outline-info btn-sm">
                            Listar
                        </Link>
                        <Link to={"/editar/" + data.id} className='btn btn-outline-warning btn-sm mx-1'>Editar</Link>
                        <Link to={"/editar-img/" + data.id} className='btn btn-outline-warning btn-sm mx-1'>Editar imagem</Link>
                    </div>
                </div>
                
                {status.type === 'error'  ? <Alert color="danger">{status.mensagem}</Alert> : ""}

                <hr className="m-3" />

                <dl className='row'>
                    <dt className='col-sm-3'>Imagem</dt>
                    <dd className='col-sm-9'>{<img src={dataImg} alt='Imagem do anúncio' width='150' height='150' />}</dd>
                    <dt className='col-sm-3'>ID</dt>
                    <dd className='col-sm-9'>{data.id}</dd>

                    <dt className='col-sm-3'>Título</dt>
                    <dd className='col-sm-9'>{data.titulo}</dd>

                    <dt className='col-sm-3'>Descrição</dt>
                    <dd className='col-sm-9'>{data.descricao}</dd>
                </dl>

            </Container>
            
        </div>
    );
};