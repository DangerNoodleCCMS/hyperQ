// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Card from './Card';
// import Options from './Options';


// const Home = () => {
//     return (
//   <div>
//     HOME PAGE
//   </div>
//     )
// }

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Card from './Card';
import Options from './Options';
import React, { useState, useEffect, createContext, useContext } from 'react';
import Header from './Header';
import 'styles.css';
// import List from './List';

const Home = () => {
  const [checked, setChecked] = React.useState(false);
  const [checkedTwo, setCheckedTwo] = React.useState(false);
  const [checkedThree, setCheckedThree] = React.useState(false);
  const [checkedFour, setCheckedFour] = React.useState(false);
  const [checkedFive, setCheckedFive] = React.useState(false);
  const [checkedSix, setCheckedSix] = React.useState(false);
  const [checkedSeven, setCheckedSeven] = React.useState(false);
  const [checkedEight, setCheckedEight] = React.useState(false);
  const [checkedNine, setCheckedNine] = React.useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  const handleChangeTwo = () => {
    setCheckedTwo(!checkedTwo);
  };

  const handleChangeThree = () => {
    setCheckedThree(!checkedThree);
  };
  const handleChangeFour = () => {
    setCheckedFour(!checkedFour);
  };

  const handleChangeFive = () => {
    setCheckedFive(!checkedFive);
  };

  const handleChangeSix = () => {
    setCheckedSix(!checkedSix);
  };

  const handleChangeSeven = () => {
    setCheckedSeven(!checkedSeven);
  };

  const handleChangeEight = () => {
    setCheckedEight(!checkedEight);
  };

  const handleChangeNine= () => {
    setCheckedNine(!checkedNine);
  };

  return (
   
    <div className = "homePage" > 
    <Card />
    <span className = "FilterBox"> 
      <Checkbox label="TV Show" value={checked} onChange={handleChange} />
      <Checkbox label="Movie" value={checkedTwo} onChange={handleChangeTwo}/>
      <Checkbox label="Action" value={checkedThree} onChange={handleChangeThree}/>
      <Checkbox label="Comedy" value={checkedFour} onChange={handleChangeFour} />
      <Checkbox label="Drama" value={checkedFive} onChange={handleChangeFive}/>
      <Checkbox label="Fantasy" value={checkedSix} onChange={handleChangeSix}/>
      <Checkbox label="Horror" value={checkedSeven} onChange={handleChangeSeven}/>
      <Checkbox label="Mystery" value={checkedEight} onChange={handleChangeEight}/>
      <Checkbox label="Thriller" value={checkedNine} onChange={handleChangeNine}/>
    </span> 
     <Options /> <Link to="/search"><img className = "navBar" src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfo2GGfKVvP2pRbnHwCVLFYiUVhhRXqQy1Zd_s1ZuQUQhW9GiXq3iD2WTHi3DlAdtba84&usqp=CAU'></img></Link>
   </div>
  );
};

const Checkbox = ({ label, value, onChange }) => {
  return (
    <label>
      <input type="checkbox" checked={value} onChange={onChange} />
      {label}
    </label>
  );

};







export default Home;