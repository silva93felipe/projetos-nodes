import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import { Container, Alert, Form, FormGroup, Label, Input, Button, Spinner } from 'reactstrap';
import api from '../../config';


export const Editar = (props)=>{

    const [id] = useState(props.match.params.id);
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');

    const [status, setStatus] = useState({
        formSave: false,
        type: '',
        mensagem: ''
    });

    const editAnuncio = async (e) =>{
        e.preventDefault()
        // console.log('titulo:'+ titulo, 'descrição:' + descricao);

        const headers = {
            'Content-Type': 'application/json'
        }

        setStatus({
            formSave: true
        });

        await api.put('/anuncios', {id, titulo, descricao}, { headers })
        .then((res) =>{
            // console.log(res.data.error);
            // console.log(res.data.message);
            if(res.data.error){
                setStatus({
                    formSave: false,
                    type: "error",
                    mensagem: res.data.message
                })
            }else{
                setStatus({
                    formSave: false,
                    type: "success",
                    mensagem: res.data.message
                })
            }
        })
        .catch((res) =>{
            setStatus({
                // formSave: false,
                type: "error",
                mensagem: "Erro: tente mais tarde."
            })
        })
    }

    useEffect(() =>{
        const getAnuncio = async () => {
            await api.get("/anuncios/" + id)
            .then((res) =>{
                // console.log(res.data.anuncio);
                setTitulo(res.data.anuncio.titulo); 
                setDescricao(res.data.anuncio.descricao); 
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
                        <h1>Editar o Anúncios</h1>
                    </div>

                    <div className="mx-auto p-3">
                        <Link to={"/"} className="btn btn-outline-info btn-sm">
                            Listar
                        </Link>
                        <Link to={"/visualizar/" + id} className='btn btn-outline-primary btn-sm mx-1'>Visualizar</Link>
                    </div>
                </div>

                {status.type === 'error'  ? <Alert color="danger">{status.mensagem}</Alert> : ""}
                {status.type === 'success'  ? <Alert color="success">{status.mensagem}</Alert> : ""}

                <hr className="m-3" />

                <Form onSubmit={editAnuncio} >
                <FormGroup>
                    <Label>Título</Label>
                    <Input
                        type="text"
                        name="titulo"
                        placeholder="Título do anúncio" 
                        value={titulo}
                        onChange={e => setTitulo(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Descrição</Label>
                    <Input
                        type="text"
                        name="descricao"
                        placeholder="Descrição do anúncio"
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)} 
                    />
                </FormGroup>

                {status.formSave ? <Button type='submit' outline color='warning' disabled>Salvando<Spinner size="sm" color="warning" /></Button> : <Button type='submit' outline color='warning'>Salvar</Button>}

            </Form>

            </Container>
        </div>
    );
};
