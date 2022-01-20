// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// const Options = () => {
//     return (
//   <div>
//       <Card />
//       Options
//   </div>
//     )
// }

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect, createContext, useContext } from 'react';


const Options = (props) => {

  const [movie, setMovie] = useState('');

  const handleChange = e => {
    setMovie(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault();
    // props.onSubmit({
    //   id: Math.floor(Math.random() * 1000),
    //   text: movie
    // })
    setMovie('');
  }
    return (
  <div className = "homePage" onClick = {handleSubmit}>
   <input type ='text' value ={movie} className = 'to-do input' onChange = {handleChange} />
    <button className = 'filterButton'>Filter Button</button>
  </div>
    )
}

export default Options;