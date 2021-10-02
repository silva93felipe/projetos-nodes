import React from 'react';
import {Router} from 'react-router-dom';

import Routes from './routes/routesAdmin';

import { AuthProvider } from './Context/AuthContext';

import history from './services/history';

function App() {
  return (
    <div >
      <AuthProvider>
        <Router history={history}>
          <Routes />
        </Router>
      </AuthProvider>    
    </div>
  );
}

export default App;
