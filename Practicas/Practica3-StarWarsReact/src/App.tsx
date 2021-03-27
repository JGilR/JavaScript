import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomePage from './components/pages/HomePage';
import People from './components/People';
import Planets from './components/Planets';
import Films from './components/Films';

function App() {

  return (
    <>
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={HomePage}/>
        <Route path='/films'>
          <Films />
        </Route>
        <Route path='/people'>
          <People />
        </Route>
        <Route path='/planets'>
          <Planets />
        </Route>
      </Switch>
    </Router>
    </>
  );
}

export default App;
