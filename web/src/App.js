import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AccessTokenContextProvider } from './components/Providers/AccessTokenContextProvider.jsx'
import Home from './components/Pages/Home.jsx'
import Login from './components/Pages/Login.jsx'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <AccessTokenContextProvider>
          <Route path="/" exact component={Login} />
          <Route path="/home" exact component={Home} />
        </AccessTokenContextProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
