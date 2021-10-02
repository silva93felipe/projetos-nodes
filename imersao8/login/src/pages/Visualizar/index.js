import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu';
import api from '../../config/configApi';
import { AlertDanger, AlertSuccess, BotaoAcao, Container, ConteudoTitulo, Titulo, ButtonInfo, Conteudo } from '../../styles/custom_adm';
import { ConteudoUsuario } from './style';

export const Visualizar = (props) =>{

    const [data, setData] = useState([]);
    const[id] = useState(props.match.params.id);
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    useEffect(()=>{
        const getUsuario = async () =>{
            await api.get("/usuario/"+ id)
            .then((res) =>{
                if (res.data.erro) {
                    setStatus({
                        type: 'erro',
                        message: res.data.message
                    })
                } else {
                    setData(res.data.usuario)
                }
            }).catch(() =>{
                setStatus({
                    type: 'erro',
                    message: "Tente mais tarde."    //res.data.message
                })
            })
        }

        getUsuario();
    },[id])

    return (
        <Container>
            <Menu />
            <ConteudoTitulo>
                <Titulo>Visualizar</Titulo>
                <BotaoAcao>
                    <Link to="/listar">
                        <ButtonInfo>Listar</ButtonInfo> 
                    </Link>
                </BotaoAcao>
            </ConteudoTitulo>

            <Conteudo>
                {status.type === 'erro' ? <AlertDanger>{status.message}</AlertDanger>
                    : ""}

                {status.type === 'success' ? <AlertSuccess>{status.message}</AlertSuccess>
                    : ""}

                <ConteudoUsuario>ID: {data.id}</ConteudoUsuario> 
                <ConteudoUsuario>Nome: {data.nome}</ConteudoUsuario> 
                <ConteudoUsuario>E-mail: {data.email}</ConteudoUsuario> 
            </Conteudo>
        </Container>
    )
}