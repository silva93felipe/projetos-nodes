import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu';
import api from '../../config/configApi';
import { AlertDanger, AlertSuccess, BotaoAcao, Container, 
    ConteudoTitulo, Titulo, ButtonInfo, Form, Conteudo, Label, Input, ButtonSuccess } from '../../styles/custom_adm';


export const Cadastrar = () =>{

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const [usuario, setUsuario] = useState({
        nome: '',
        email: '',
        senha: ''
    })

    const valorInput = e => setUsuario({...usuario, [e.target.name]: e.target.value});

    const cadUsuario = async e =>{
        e.preventDefault();
        
        const headers = {
            'Content-Type': 'application/json'
        }

        await api.post("/usuarios", usuario, {headers})
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

    return (
        <Container>
            <Menu />
            <ConteudoTitulo>
                <Titulo>Cadastrar Usuário</Titulo>
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

                <Form onSubmit={cadUsuario}>
                    <Label>Nome:</Label>
                    <Input type='text' name='nome' placeholder='Nome do usuário' onChange={valorInput} />

                    <Label>Email:</Label>
                    <Input type='email' name='email' placeholder='Email' onChange={valorInput}/>

                    <Label>Senha:</Label>
                    <Input type='passaword' name='password' placeholder='Senha' onChange={valorInput} />

                    <ButtonSuccess type='submit'>Cadastrar</ButtonSuccess>
                </Form>
            </Conteudo>
        </Container>
    )
}