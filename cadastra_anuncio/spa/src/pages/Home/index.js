import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Table, Alert } from "reactstrap";
import ModalAsk from "../../components/Modal";

import api from '../../config';

export const Home = () => {

    const [data, setData] = useState([]);
    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const apagarAnuncio = async (id) =>{
        const headers = {
            'Content-Type': 'application/json'
        }

        await api.delete('/anuncios/' + id, {headers})
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
                });
                getAnuncios();
            }
        })
        .catch((res) =>{
            setStatus({
                type: "success",
                mensagem: res.data.message
            })
        })
    }
    
    const getAnuncios = async () => {
        await api.get("/anuncios")
        .then((res) =>{
            // console.log(res.data.anuncios )
            setData(res.data.anuncios)
        })
        .catch(() =>{
            setStatus({
                type: 'Erro',
                mensagem: 'Erro: Tente mais tarde.'
            })
        })
    }

    useEffect(() =>{
        getAnuncios();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h1>Anúncios</h1>
                    </div>

                    <div className="mx-auto p-3">
                        <Link to={"/cadastrar"} className="btn btn-outline-success btn-sm">
                            Cadastrar
                        </Link>
                    </div>
                </div>

                {status.type === 'Erro'  ? <Alert color="danger">{status.mensagem}</Alert> : ""}
                {status.type === 'success'  ? <Alert color="success">{status.mensagem}</Alert> : ""}

                <Table striped hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Anúncio</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map(item =>(
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.titulo}</td>
                        <td className='center'>
                            <div className="container-content">
                                <Link to={"/visualizar/" + item.id} className='btn btn-outline-primary btn-sm'>Visualizar</Link>
                                <Link to={"/editar/" + item.id} className='btn btn-outline-warning btn-sm mx-1'>Editar</Link>
                                <ModalAsk buttonLabel={"Apagar"} title = {"Info"} info={"Deseja realmente apagar?"} onClick={() => apagarAnuncio(item.id)}/>
                            </div>
                            
                            {/* <span className='btn btn-outline-danger btn-sm mx-1 ' onClick={}>Apagar</span> */}
                        </td>
                    </tr>
                    ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};
