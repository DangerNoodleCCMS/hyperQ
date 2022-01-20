import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { login, logout} from '../actions/functions';

const Login = () => {

  const [user, setUser] = useState({username: '', password: ''})

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    
    
    fetch('/user/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(data => data.json())
    .then(data => {
      console.log('data from server', data);
      if (data.loggedIn) {
        navigate('/home')
      } else {
        console.log("FAILED");
      }
    })
  }


  return (
    <div>
      <div>
          <label>Username:</label>
          <input type='text' onChange={e => setUser({...user, username: e.target.value})}></input>
        </div>
        <div>
          <label>Password:</label>
          <input type='text' onChange={e => setUser({...user, password: e.target.value})}></input>
        </div>
        <div>
          <button onClick={handleClick}>Submit</button>
        </div>
      {/* <Link to="/home" onClick={handleClick}><img className = "homepageButton" src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfo2GGfKVvP2pRbnHwCVLFYiUVhhRXqQy1Zd_s1ZuQUQhW9GiXq3iD2WTHi3DlAdtba84&usqp=CAU'></img></Link> */}
    </div>
  )
}

export default Login;