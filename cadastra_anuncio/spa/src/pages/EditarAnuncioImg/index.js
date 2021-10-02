import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Container, Form, FormGroup, Input, Label, Spinner } from 'reactstrap';
import api from '../../config';

export const EditarAnuncioImg  = ( props )=>{

    const [id] = useState(props.match.params.id);
    const [endImagem, setEndImagem] = useState(''); 
    const [imagem, setImagem] = useState('');
    const [status, setStatus] = useState({
        formSave: false,
        type: '',
        mensagem: ''
    });

    const editarAnuncioImg = async (e) =>{
        e.preventDefault();

        setStatus({formSave: true})
        
        const formData = new FormData();
        formData.append('imagem', imagem);

        const headers = {
            'Content-Type': 'application/json'
        }

        await api.put("/anuncios-img/" + id, formData, { headers })
        .then((res) =>{
            if(res.data.error){
                setStatus({
                    formSave: false,
                    type: "error",
                    mensagem: res.data.message
                })
            } else{
                setStatus({
                    formSave: false,
                    type: "success",
                    mensagem: res.data.message
                })
            }
        }).catch(() =>{
            setStatus({
                formSave: false,
                type: "error",
                mensagem: 'Error: Tente uma imagem válida.'
            })
        })
    }

    useEffect(() =>{
        const getAnuncio = async () => {
            await api.get("/anuncios/" + id)
            .then((res) =>{
                // console.log(res.data.anuncio);
                setEndImagem(res.data.endImagem); 
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
                        <h1>Editar imagem do anúncio</h1>
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

                <Form onSubmit={editarAnuncioImg}>
                    <FormGroup>
                        <Label>Imagem</Label>

                        <Input type='file' name='imagem' onChange={e => setImagem(e.target.files[0])} />
                    </FormGroup>

                    <FormGroup>
                        { imagem ? <img src={URL.createObjectURL(imagem)} alt='Sem imagem' 
                        width='150' height='150' /> :  <img src={endImagem} alt='Sem imagem' 
                        width='150' height='150'/>}
                    </FormGroup>

                    {status.formSave ? <Button type='submit' outline color='warning' disabled>Salvando<Spinner size="sm" color="warning" /></Button> : <Button type='submit' outline color='warning'>Salvar</Button>}
                </Form>

            </Container>
        </div>
    )
};
