// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Card from './Card';
// import Options from './Options';
// import React, { useState, useEffect, createContext, useContext } from 'react';

// const Search = () => {

//   const [newMovie, setNewMovie] = useState('');
//     return (
//   <div className = "searchPage">
//     <input type ='text' value ={newMovie} className = 'newMovie'/>
//     <button className = 'searchButton'>Search Button</button>
//   </div>
//     )
//     }

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Card from './Card';
import Options from './Options';
import React, { useState, useEffect, createContext, useContext } from 'react';
import './Search.css';

const Search = () => {

  const [newMovie, setNewMovie] = useState('');
    return (
  <div className = "searchPage">
    <h1 className = "SearchMovies">Search for All Your favorite Movies and TV Shows</h1>
    <input type ='text' className = "searchMovie" value ={newMovie} className = 'newMovie'/>
    <button className = 'searchButton'>Search</button>
  </div>
    )
    }

  
export default Search;
  
// export default Search;