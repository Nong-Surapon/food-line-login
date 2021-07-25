import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import './App.css';

const App = () => {
  console.log('process', process.env);
  return (
    <BrowserRouter>
      <Route path={'/'} exact component={Login} />
      <Route path={'/profile'} component={Profile} />
      <Route path={'/login'} component={Login} />
    </BrowserRouter>
  );
};

export default App;
