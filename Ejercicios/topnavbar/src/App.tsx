import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/Home';
import Navbar from './components/Navbar';
import Item2 from './components/Item2';
import Item1 from './components/Item1';
import Item3 from './components/Item3';


function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Route path='/' exact component={Home}/>
        <Route path='/item1'>
          <Item1/>
        </Route>
        <Route path='/item2'>
          <Item2/>
        </Route>
        <Route path='/item3'>
          <Item3/>
        </Route>
      </Router>
    </>
  );
}

export default App;
