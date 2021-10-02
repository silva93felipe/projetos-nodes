import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu';
import api from '../../config/configApi';
import { AlertDanger, AlertSuccess, BotaoAcao, ButtonSuccess, ButtonPrimary, Container, ConteudoTitulo, Table, Titulo, ButtonWarning, ButtonDanger  } from '../../styles/custom_adm';

export const Listar = () =>{

    const [data, setData] = useState({});
    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const getUsuarios = async () =>{
        await api.get("/usuarios")
        .then((res) =>{
            if(res.data.erro){
                setStatus({
                    type: 'erro',
                    message: res.data.message
                });
            }else{
                setData(res.data.usuarios);
                
            }
        })
        .catch(() =>[
            setStatus({
                type: 'erro',
                message: 'Erro, tente mais tarde.'
            })
        ])
    }

    useEffect(() =>{
        getUsuarios()
    }, []);

    const apagarUsuario = async (idUsuario) =>{
        console.log(idUsuario);

        const headers = {
            'Content-Type': 'application/json'
        }

        await api.delete('/usuario/' + idUsuario, {headers})
        .then((res) =>{
            if(res.data.erro){
                setStatus({
                    type: 'erro',
                    message: res.data.message
                });
            }else{
                setStatus({
                    type: 'success',
                    message: res.data.message
                })
                getUsuarios()
            }
        }).catch(() =>{
            setStatus({
                type: 'erro',
                message: 'Tente mais tarde'
            })
        })
    }

    return (
        <Container>
            <Menu />
            <ConteudoTitulo>
                <Titulo>Listar</Titulo>
                <BotaoAcao>
                    <Link to="/cadastrar">
                        <ButtonSuccess>Cadastrar</ButtonSuccess> 
                    </Link>
                </BotaoAcao>
            </ConteudoTitulo>
            {status.type === 'erro' ? <AlertDanger>{status.message}</AlertDanger>
                : ""}

            {status.type === 'success' ? <AlertSuccess>{status.message}</AlertSuccess>
                : ""}
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(data) && data.map(usuario =>(
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.nome}</td>
                            <td>{usuario.email}</td>
                            <td>
                                <Link to={"/visualizar/" + usuario.id}>
                                    <ButtonPrimary>
                                        Visualizar    
                                    </ButtonPrimary>
                                </Link>

                                <Link to={"/editar/" + usuario.id}>
                                    <ButtonWarning>
                                        Editar
                                    </ButtonWarning>
                                </Link>
                                
                                <Link to={"#"}>
                                    <ButtonDanger onClick={() => apagarUsuario(usuario.id)}>
                                        Apagar
                                    </ButtonDanger>
                                </Link>
                                
                            </td>
                            
                        </tr>
                    ))}
                    
                </tbody>
            </Table>
            
        </Container>
    )
}