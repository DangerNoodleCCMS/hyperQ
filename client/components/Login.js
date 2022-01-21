import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { login, logout} from '../actions/functions';
import './Login.css'
import Signup from './Signup'

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
        dispatch(login({id: 222, username: user.username}));
        navigate('/home')
      } else {
        console.log("FAILED");
      }
    })
  }


  return (
  <div className = "login"> 
  <h1>Welcome to myMediaManager</h1>
   <div> 
       {/* <label>Username:</label> */}
       <input className = "username" placeholder = "Username" type='text' onChange={e => setUser({...user, username: e.target.value})}></input>
     </div>
     <div>
       {/* <label>Password:</label> */}
       <input className = "password" type="password" placeholder = "Password" onChange={e => setUser({...user, password: e.target.value})}></input>
     </div>
     <div>
       <button className ="loginButton" onClick={handleClick}>Login</button>
     <Link to="/signup"><button className = "signUp">Sign Up Here</button></Link>
     </div>
   {/* <Link to="/home" onClick={handleClick}><img className = "homepageButton" src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfo2GGfKVvP2pRbnHwCVLFYiUVhhRXqQy1Zd_s1ZuQUQhW9GiXq3iD2WTHi3DlAdtba84&usqp=CAU'></img></Link> */}
 </div>
)
}

export default Login;