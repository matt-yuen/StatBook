import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Pages/Home.jsx'
import Login from './components/Pages/Login.jsx'

function App() {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/home" exact component={Home} />
    </Router>
  );
}

export default App;
