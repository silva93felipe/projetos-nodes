import React from 'react';
import {BrowserRouter as Router, Switch, Route, } from 'react-router-dom'
import { Home } from './pages/Home/index'
import { Visualizar } from './pages/Visualizar/index'
import { Cadastrar } from './pages/Cadastrar/index'
import { Editar } from './pages/Editar/index'

import { Menu } from './components/Menu'
import { EditarAnuncioImg } from './pages/EditarAnuncioImg';

function App() {
  return (
    <div>
      <Menu />
      <Router>
        <Switch>
          <Route exact path="/" component={ Home }/>
          <Route exact path="/visualizar/:id" component={ Visualizar }/>
          <Route exact path="/cadastrar" component={ Cadastrar }/>
          <Route exact path="/editar/:id" component={ Editar }/>
          <Route exact path="/editar-img/:id" component={ EditarAnuncioImg }/>
        </Switch>
      </Router>  
    </div>
  );
}

export default App;
