import React, { useState } from "react";
import { Container, Form, FormGroup, Label, Input, Button, Alert, Spinner } from "reactstrap";
import { Link } from "react-router-dom";

import api from '../../config';

export const Cadastrar = () => {

    const [anuncio, setAnuncio] = useState({
        titulo: '',
        descricao: ''
    })

    const [status, setStatus] = useState({
        formSave: false,
        type: '',
        mensagem: ''
    });

    const valorInput = (e) => {
        setAnuncio({...anuncio, [e.target.name]: e.target.value});
    }

    const cadAnuncio = async (e) =>{
        e.preventDefault();

        setStatus({
            formSave: true
        });

        const headers = {
            'Content-Type': 'application/json'
        }

        await api.post('/anuncios', anuncio, { headers })
        .then((res) =>{

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
        .catch(() =>{
            setStatus({
                formSave: false,
                type: "error",
                mensagem: "Erro: tente mais tarde."
            });
        })
    }

    return (
        <Container>
            <div className="d-flex">
                <div className="mr-auto p-2">
                    <h1>Cadastrar Anúncio</h1>
                </div>

                <div className="mx-auto p-3">
                    <Link to={"/"} className="btn btn-outline-info btn-sm">
                        Listar
                    </Link>
                </div>
            </div>

            {status.type === 'error'  ? <Alert color="danger">{status.mensagem}</Alert> : ""}
            {status.type === 'success'  ? <Alert color="success">{status.mensagem}</Alert> : ""}

            <hr className="m-3" />

            <Form onSubmit={cadAnuncio} >
                <FormGroup>
                    <Label>Título</Label>
                    <Input
                        type="text"
                        name="titulo"
                        placeholder="Título do anúncio" onChange={valorInput}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Descrição</Label>
                    <Input
                        type="text"
                        name="descricao"
                        placeholder="Descrição do anúncio" onChange={valorInput}
                    />
                </FormGroup>

                {status.formSave ? <Button type='submit' outline color='success' disabled>Salvando<Spinner size="sm" color="success" /></Button> : <Button type='submit' outline color='success'>Cadastrar</Button>}

            </Form>
        </Container>
    );
};
