import React, { useContext, useState } from 'react';

import { useHistory } from 'react-router-dom';

import { Context } from '../../Context/AuthContext'

import api from '../../config/configApi';

export const Login = () =>{
    const history = useHistory();

    const {signIn} = useContext(Context);

    const [dadosUsuario, setDadosUsuario] = useState ({
        usuario: '',
        senha: ''
    })

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })
    
    const valorInput = (e) => setDadosUsuario({
        ...dadosUsuario, [e.target.name]: e.target.value
    })

    
    const loginSubmit = async (e) =>{
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        }

        api.post("/login", dadosUsuario, {headers})
        .then((res) =>{

            if(res.data.erro){
                setStatus({
                    type: 'erro',
                    message: res.data.message
                })
            }else{
                setStatus({
                    type: 'success',
                    message: res.data.message
                });
                localStorage.setItem('token', JSON.stringify(res.data.token));

                api.defaults.headers.Authorization = `Bearer ${res.data.token}`
                signIn(true)
                return history.push('/dashboard')
            } 
        }).catch(() =>{
            setStatus({
                type: 'erro',
                message: 'Erro. Tente novamente em outro momento.',
            })
        })
    }

    return(
        <div>

            <h1>Login</h1>
            
            {status.type === 'erro' ? <p> {status.message} </p> : ""}
            {status.type === 'success' ? <p> {status.message} </p> : ""}
            

            <form onSubmit={loginSubmit}>
                <label>Usuário:</label>
                <input type='text' name='usuario' placeholder='Usuário' onChange={valorInput} />

                <label>Senha:</label>
                <input type='password' name='senha' placeholder='Senha' onChange={valorInput} />

                <button type='submit'>Acessar</button>
            </form>
            

        </div>
    )
}
