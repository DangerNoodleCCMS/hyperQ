import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Card from './Card';
import Options from './Options';
import React, { useState, useEffect, createContext, useContext } from 'react';
import Header from './Header';
import 'styles.css';
import List from './List';
import { updateMedia } from '../actions/functions';
import { useSelector, useDispatch } from 'react-redux';

const Home = () => {

  const dispatch = useDispatch();
  const mediaList = useSelector(state => state.user.mediaList);

  const [checked, setChecked] = React.useState(false);
  const [checkedTwo, setCheckedTwo] = React.useState(false);
  const [checkedThree, setCheckedThree] = React.useState(false);
  const [checkedFour, setCheckedFour] = React.useState(false);
  const [checkedFive, setCheckedFive] = React.useState(false);
  const [checkedSix, setCheckedSix] = React.useState(false);
  const [checkedSeven, setCheckedSeven] = React.useState(false);
  const [checkedEight, setCheckedEight] = React.useState(false);
  const [checkedNine, setCheckedNine] = React.useState(false);

  // on the page load fetch all the corresponding items in the list for this user
  useEffect( () => {
    fetch('/api/media')
    .then(data => data.json())
    .then(data => {
      console.log('data from server', data);
      dispatch(updateMedia(data));
    })
  },[])

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

  const handleEdit = (e) => {
    console.log("the priority list number is: ", e);
  }

  const handleDelete = (obj) => {

    console.log("the priority list number is: ", e);

    fetch('/api/media', {
      method: 'PUT',
      body: JSON.stringify(obj),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(data => data.json)
      .then(data => console.log("data after deleting movie", data));
    
  }


  const lists = [];
  for (let prior in mediaList) {
    lists.push(<List list={mediaList[prior]} edit={handleEdit} delete={handleDelete}/>)
  }

  return (
   
    <div className = "homePage" > 
        <Card />
        <div className = "FilterBox"> 
        <Checkbox label="TV Show" value={checked} onChange={handleChange} />
        <Checkbox label="Movie" value={checkedTwo} onChange={handleChangeTwo}/>
        <Checkbox label="Action" value={checkedThree} onChange={handleChangeThree}/>
        <Checkbox label="Comedy" value={checkedFour} onChange={handleChangeFour} />
        <Checkbox label="Drama" value={checkedFive} onChange={handleChangeFive}/>
        <Checkbox label="Fantasy" value={checkedSix} onChange={handleChangeSix}/>
        <Checkbox label="Horror" value={checkedSeven} onChange={handleChangeSeven}/>
        <Checkbox label="Mystery" value={checkedEight} onChange={handleChangeEight}/>
        <Checkbox label="Thriller" value={checkedNine} onChange={handleChangeNine}/>
      </div>    
      <Options /> 
    <div className='lists-div'>
        {lists}
      </div>
    
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