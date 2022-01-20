import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect, createContext, useContext } from 'react';


function Card({ media_id, title, category, duration, priority, url, user_id }) { 
  
  const [cards, setCard] = useState([]);

  return(
    <div className="card">
      <div className="title-button-div">
       <h3>{title}</h3>  
       <div className="edit-del">
       <Link to="/search"><button className = "navBar">Search for Title</button></Link>
         {/* <button id="edit-btn"><i class="fas fa-edit"></i></button> 
         <button id="del-btn"><i class="fas fa-trash-alt"></i></button> */}
         <div className = "streamingServices">
     <a href="https://www.netflix.com/"><button className = "netflix">Netflix</button></a>
     <a href="https://www.hulu.com/welcome?orig_referrer=https%3A%2F%2Fwww.google.com%2F"><button className = "hulu">Hulu</button></a> 
     <a href="https://www.amazon.com/amazonprime"><button className = "amazon">Amazon Prime</button></a>
     <a href="https://www.hbomax.com/"><button className = "hbo">HBO Max</button></a>
     <a href="https://www.disneyplus.com/"><button className = "Disney">Disney+</button></a>
   </div>
         </div>
       </div>
    </div>
  )
};

export default Card;