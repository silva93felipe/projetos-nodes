import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { Container, ConteudoTitle, Titulo, ButtomSucess, BotaoAcao, 
    ButtomPrimary, AlertDanger, AlertSuccess, Form, Label, Input, Select } from '../../styles/custom_adm';
    
import api from '../../config/api';

export const Editar = (props) =>{

    const [id] = useState(props.match.params.id);
    const [nome, setNome] = useState("");
    const [valor, setValor] = useState("");
    const [tipo, setTipo] = useState("");
    const [situacao, setSituacao] = useState("");
    const [dataPagamento, setDataPagamento] = useState("");
    
    const [valorLancTarge, setValorLancTarge] = useState("");

    const [status, setStatus] = useState({
        type: "",
        mensagem: ""
    })


    const convertReal = async (valorLancamentoInput) =>{
        
        var valorLanConvert = valorLancamentoInput.toString().replace(/\D/g, "");
        console.log(valorLanConvert);
        valorLanConvert = valorLanConvert.replace(/(\d)(\d{2})$/, "$1,$2");
        valorLanConvert = valorLanConvert.replace(/(?=(\d{3})+(\D))\B/g, ".");
        
        setValorLancTarge(valorLanConvert);
        console.log(valorLanConvert);
        var valorSalvar = await valorLanConvert.replace(".", "");
        valorSalvar = await valorSalvar.replace(",", ".");

        setValor(valorSalvar)
        console.log(valorSalvar);

        
    }   
    
    useEffect(()=>{
        const getLancamento = async () =>{
            await api.get("/visualizar/" + id)
            .then((res) =>{
                console.log(res);
                setNome(res.data.lancamento.nome)
                setValor(res.data.lancamento.valor)
                convertReal(res.data.lancamento.valor)
                setTipo(res.data.lancamento.tipo)
                setSituacao(res.data.lancamento.situacao)
                setDataPagamento(moment(res.data.lancamento.dataPagamento).format("YYYY-MM-DD"))
    
            }).catch((erro)=>{
                if(erro.response){
                    setStatus({
                        type: "erro",
                        mensagem: erro.responde.data.mensagem
                    })
                }else{
                    setStatus({
                        type: "erro",
                        mensagem: "Erro: Tente mais tarde."
                    })
                }

            })
        }
        getLancamento()
    }, [id])

    const editLancamento = async e =>{
        e.preventDefault();
        const headers = {
            "Content-Type": "application/json"
        }

        await api.put("/editar", {id, nome, valor, tipo, situacao, dataPagamento}, {headers})
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

    }

    return(
        <Container>
            <ConteudoTitle>
                <Titulo>Editar</Titulo>

                <BotaoAcao>
                    <Link to={"/"}>
                        <ButtomPrimary>Listar</ButtomPrimary>
                    </Link>
                    
                </BotaoAcao>
            </ConteudoTitle>

            {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger>: ""}
            {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess>: ""}
            
            <Form onSubmit={editLancamento}>
                <Label>Nome: </Label>
                <Input type='text' name='nome' value={nome} placeholder="Nome do lançamento" onChange={e =>setNome(e.target.value)}/>

                <Label>Valor: </Label>
                <Input type='text' name='valorLancTarget' value={valorLancTarge} placeholder="Valor do lançamento" onChange={e =>convertReal(e.target.value)} />

                <Label>Tipo: </Label>
                <Select name='tipo' value={tipo} onChange={e =>setTipo(e.target.value)}>
                    <option value=''>Selecione</option>
                    <option value='1'>Pagamento</option>
                    <option value='2'>Recebimento</option>
                </Select>
            

                <Label>Situação: </Label>
                <Select name='situacao' value={situacao} onChange={e =>setSituacao(e.target.value)} >
                    <option value=''>Selecione</option>
                    <option value='1'>Pago</option>
                    <option value='2'>Pendente</option>
                </Select>
        
                <Label>Data: </Label>
                <Input type='date' name='dataPagamento'  value={dataPagamento} onChange={e =>setDataPagamento(e.target.value)}/>

                <ButtomSucess type="submit">Salvar</ButtomSucess>

            </Form>
        </Container>
    )
}