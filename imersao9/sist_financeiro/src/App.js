import React from 'react';
import  {BrowserRouter, Switch, Route} from 'react-router-dom';

import { Cadastrar } from './pages/Cadastrar';
import { Editar } from './pages/Editar';
import { Home } from './pages/Home';

function App() {
  return ( 
    <BrowserRouter>
      <Switch>
        {/* <Route path="/" exact >
          <Home />
        </Route> */}
        <Route path="/" exact component={Home} />
        <Route path="/cadastrar" exact component={Cadastrar} />
        <Route path="/editar/:id" exact component={Editar} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
