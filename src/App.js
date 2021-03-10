import React, {useState, useEffect} from 'react'
import './App.css';
import Monitoring from './views/Monitoring';
import FileUpload from './Components/FileUpload';
import Home from './Components/Home'
import {Route, Link} from 'react-router-dom'
import NavBar from './Components/NavBar'

function App() {
  return (
    <div className='App'>
      <NavBar/>
      <Route exact path="/" component={Home} />
      <Route exact path="/FileUpload" component={FileUpload} />
      <Route exact path="/Monitoring" component={Monitoring} />
    </div>

  );
}

export default App;
