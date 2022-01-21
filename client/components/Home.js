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

  const [filter, setFilter] = useState("");


  // on the page load fetch all the corresponding items in the list for this user
  useEffect(() => {
    fetch('/api/media')
      .then(data => data.json())
      .then(data => {
        console.log('data from server', data);
        dispatch(updateMedia(data));
      })
  }, [])


  const handleDelete = (obj) => {

    console.log("DELETE: the priority list number is: ", obj);

    fetch('/api/media', {
      method: 'PUT',
      body: JSON.stringify(obj),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(data => data.json())
      .then(data => {
        console.log("data after deleting movie", data);
        dispatch(updateMedia(data));
      });
  }

  const handleSubmit = (e) => {
    console.log('filtervalue: ', filter);
  }


  const lists = [];
  let name = 'priority'
  if (Object.keys(mediaList).length > 0) {
    for (let i = 1; i < 4; i++) {
      const listName = name + i;
      // console.log(listName);
      // console.log(mediaList[listName]);
      // console.log('medialist', mediaList);
      lists.push(<List list={mediaList[listName]} delete={handleDelete} />)
    }
  }

  return (

    <div className="homePage" >
      
      {/* <Checkbox label={'action'} value={'action'} onChange={}/> */}
      <Card />
      <div className='genre'>
        <select className='genre-select' onChange={e => setFilter(e.target.value)}>
          <option value='Action'>Action</option>
          <option value='Comedy'>Comedy</option>
          <option value='Sci-fi'>Sci-fi</option>
        </select>
        <button className='genre-submit' onClick={handleSubmit}>Submit</button>
      </div>

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

{/* <div className="FilterBox">
      <Checkbox label="Comedy" value={checkedFour} onChange={e => setCheckedFour(e.target.value)} />
      <button className='filterButton'>Filter Here</button>
      </div> */}
{/* <Checkbox label="TV Show" value={checked} onChange={handleChange} />
            <Checkbox label="Movie" value={checkedTwo} onChange={handleChangeTwo}/>
            <Checkbox label="Action" value={checkedThree} onChange={handleChangeThree}/> */}
            // <Checkbox label="Comedy" value={checkedFour} onChange={e => setCheckedFour(e.target.value)} />
            {/* <Checkbox label="Drama" value={checkedFive} onChange={handleChangeFive}/>
                  <Checkbox label="Fantasy" value={checkedSix} onChange={handleChangeSix}/>
                  <Checkbox label="Horror" value={checkedSeven} onChange={handleChangeSeven}/>
                  <Checkbox label="Mystery" value={checkedEight} onChange={handleChangeEight}/>
                  <Checkbox label="Thriller" value={checkedNine} onChange={handleChangeNine}/>  */}



export default Home;