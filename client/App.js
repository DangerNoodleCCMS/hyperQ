import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Switch } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import { useSelector } from 'react-redux';
import Signup from './components/Signup';
import {login } from './actions/functions'
import {connect} from 'react-redux'


function App() {

  const loggedIn = useSelector(state => state.loggedIn);
  
  // useEffect( () => {
  //   dispatchEvent(login({name: "REI"}));
  // }, [])

  return (

    <div >
      <Routes>
        <Route path="/" element={<Login />}></ Route>
        <Route path="/signup" element={<Signup />}></ Route>
        <Route path="/home"  element={<Home />}></ Route>
     </Routes>
    </div>
  );
}

export default App;
