import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Switch, useNavigate } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import { useSelector } from 'react-redux';
import Signup from './components/Signup';
import {login } from './actions/functions'
import {connect} from 'react-redux'
import Card from './components/Card'
import Search from './components/Search'

function App() {
  const navigate = useNavigate();

  const loggedIn = useSelector(state => state.user.loggedIn);

  const handleClick = () => {
    navigate('/signup')
  }

  <button onClick={handleClick}> Sign Up</button>

  return (

    <div >
      
      <Routes>
        <Route path="/" element={<Login />}></ Route>
        <Route path="/signup" element={<Signup />}></ Route>
        <Route path="/home"  element={<Home />}></ Route>
        <Route path="/search"  element={<Search />}></ Route>
     </Routes>
    </div>
  );
}


export default App;
