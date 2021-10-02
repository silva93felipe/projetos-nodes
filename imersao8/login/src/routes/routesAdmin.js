import React, { useContext } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { Context } from '../Context/AuthContext';

import { Cadastrar } from '../pages/Cadastrar'; 
import { Dashboard } from '../pages/Dashboard';
import { Editar } from '../pages/Editar';
import { Listar } from '../pages/Listar';
import { Login } from '../pages/Login';
import { Visualizar } from '../pages/Visualizar';

export default function RoutesAdm() {

    function CustomRoute({isPrivate, ...rest}) {
        const {authenticated} = useContext(Context);

        if(isPrivate && !authenticated){
            return <Redirect to='/'/>
        }

        return <Route {...rest} />
    }

    
    return(
        <Switch>
            <CustomRoute exact path="/" component={Login} />
            <CustomRoute isPrivate exact path="/dashboard" component={Dashboard} />
            <CustomRoute isPrivate exact path="/listar" component={Listar} />
            <CustomRoute isPrivate exact path="/visualizar/:id" component={Visualizar} />
            <CustomRoute isPrivate exact path="/cadastrar" component={Cadastrar} />
            <CustomRoute isPrivate exact path="/editar/:id" component={Editar} />
        </Switch>
    )
}