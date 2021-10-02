import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Container, ConteudoTitle, Titulo, ButtomSucess, BotaoAcao, 
    ButtomPrimary, AlertDanger, AlertSuccess, Form, Label, Input, Select } from '../../styles/custom_adm';


import api from '../../config/api'

export const Cadastrar = () =>{

    const [lancamento, setLancamento] = useState({
        nome: '',
        valor: '',
        tipo: '',
        situacao: '',
        dataPagamento: '',
    })

    const [status, setStatus] = useState({
        type: "",
        mensagem: ""
    })

    const [valorLancTarget, setValorLancTarget] = useState("");

    const valorInput = e => setLancamento({...lancamento, [e.target.name]: e.target.value})

    const valorLancamento = async e =>{
        var valorLancamentoInput = e.target.value;
        // console.log(valorLancamentoInput);

        valorLancamentoInput = valorLancamentoInput.replace(/\D/g, "");
        valorLancamentoInput = valorLancamentoInput.replace(/(\d)(\d{2})$/, "$1,$2");
        valorLancamentoInput = valorLancamentoInput.replace(/(?=(\d{3})+(\D))\B/g, ".");
        
        setValorLancTarget(valorLancamentoInput);

        var valorSalvar = await valorLancamentoInput.replace(".", "");
        valorSalvar = await valorSalvar.replace(",", ".");

        setLancamento({...lancamento, valor: valorSalvar})
    }

    const cadLancamento = async e =>{
        e.preventDefault();

        const headers = {
            "Content-Type": "application/json"
        }

        await api.post("/cadastrar", lancamento, {headers})
            .then((res) =>{
                console.log(res);
                setStatus({
                    type: "success",
                    mensagem: res.data.mensagem
                })
            }).catch((err) =>{
                console.log(err.res);
                if(err.res){
                    setStatus({
                        type: "erro",
                        mensagem: err.res.data.mensagem
                    })
                }else{
                    setStatus({
                        type: "erro",
                        mensagem: "Tente novamente mais tarde."
                    })
                }
                
            })

        console.log(lancamento.nome);
    }
    return(
        <Container>
            <ConteudoTitle>
                <Titulo>Cadastrar</Titulo>

                <BotaoAcao>
                    <Link to={"/"}>
                        <ButtomPrimary>Listar</ButtomPrimary>
                    </Link>
                    
                </BotaoAcao>
            </ConteudoTitle>


            {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger>: ""}
            {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess>: ""}

            <Form onSubmit={cadLancamento}>
                <Label>Nome: </Label>
                <Input type='text' name='nome' placeholder="Nome do lançamento" onChange={valorInput}/>

                <Label>Valor: </Label>
                <Input type='text' name='valor' placeholder="Valor do lançamento" value={valorLancTarget}  onChange={valorLancamento}/>

                <Label>Tipo: </Label>
                <Select name='tipo'onChange={valorInput}>
                    <option value=''>Selecione</option>
                    <option value='1'>Pagamento</option>
                    <option value='2'>Recebimento</option>
                </Select>

                <Label>Situação: </Label>
                <Select name='situacao' onChange={valorInput}>
                    <option value=''>Selecione</option>
                    <option value='1'>Pago</option>
                    <option value='2'>Pendente</option>
                </Select>

                <Label>Data: </Label>
                <Input type='date' name='dataPagamento'  onChange={valorInput}/>

                <ButtomSucess type="submit">Cadastrar</ButtomSucess>

            </Form>
        </Container>
    );
}