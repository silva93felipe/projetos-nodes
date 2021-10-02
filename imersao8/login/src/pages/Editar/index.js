import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu';
import api from '../../config/configApi';
import { AlertDanger, AlertSuccess, BotaoAcao, Container, ConteudoTitulo, 
    Titulo, ButtonInfo, Conteudo, Form, Label, Input,  ButtonWarning } from '../../styles/custom_adm';

export const Editar = (props) =>{

    const[id] = useState(props.match.params.id);

    const[nome, setNome] = useState('');
    const[email, setEmail] = useState('');
    const[senha, setSenha] = useState('');


    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const editUsuario = async e =>{
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        }

        await api.put('/usuario', {id, nome, email, senha}, {headers})
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
            }
        }).catch(() =>{
            setStatus({
                type: 'erro',
                message: 'Tente mais tarde'
            })
        })
    }

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
                    setNome(res.data.usuario.nome);
                    setEmail(res.data.usuario.email);
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
                <Titulo>Editar</Titulo>
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

                <Form onSubmit={editUsuario}>
                    <Label>Nome:</Label>
                    <Input type='text' name='nome' placeholder='Nome do usuário' value={nome} onChange={e => setNome(e.target.value)}/>

                    <Label>Email:</Label>
                    <Input type='email' name='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}/>

                    <Label>Senha:</Label>
                    <Input type='password' name='password' placeholder='Senha' onChange={e => setSenha(e.target.value)}/>

                    <ButtonWarning type='submit'>Salvar</ButtonWarning>
                </Form>

            </Conteudo>
        </Container>
    )
}