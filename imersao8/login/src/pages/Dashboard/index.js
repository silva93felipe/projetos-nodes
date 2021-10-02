import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu';

import { BotaoAcao, ButtonSuccess, Container, ConteudoTitulo, Titulo} from '../../styles/custom_adm';

export const Dashboard = () => {

    return(
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
        </Container>
    )
}

