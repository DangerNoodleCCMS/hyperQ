import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Card from './Card';
import Options from './Options';
import React, { useState, useEffect, createContext, useContext } from 'react';

const Search = () => {

  const [newMovie, setNewMovie] = useState('');
    return (
  <div className = "searchPage">
    <input type ='text' value ={newMovie} className = 'newMovie'/>
    <button className = 'searchButton'>Search Button</button>
  </div>
    )
    }

  
export default Search;