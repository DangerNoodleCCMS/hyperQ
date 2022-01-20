import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect, createContext, useContext } from 'react';

function Card({ media_id, title, category, duration, priority, url, user_id }) { 
  
  const [cards, setCard] = useState([]);

  return(
    <div className="card">
      <div className="title-button-div">
       <h3>{title}</h3>  
       <div className="edit-del">
         <button id="edit-btn"><i class="fas fa-edit"></i></button> 
         <button id="del-btn"><i class="fas fa-trash-alt"></i></button>
         </div>
       </div>
      <p>category: {category}</p>
      <p>duration: {duration} mins</p>
      <p>priority: {priority}</p>
      <p>url: {url}</p>
    </div>
  )
};

export default Card;