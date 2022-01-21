// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

// const Signup = () => {

//   const [user, setUser] = useState({username: '', password: ''})

//   const handleClick = (e) => {

//     e.preventDefault();
//     dispatchEvent(login(user));
    // fetch('/user', {
      //   method: 'POST',
      //   body: JSON.stringify(user),
      //   headers: { 'Content-Type': 'application/json' },
      // })
      // .then(data => data.json())
      // .then(data => {
      //   if (data) {
      //     navigate('/home')
      //   }
      // })
  // }

//   return(
//   <div>
//       <div>
//         <label>Create Username:</label>
//         <input type='text' onChange={e => setUser({...user, userName: e.target.value})}></input>
//       </div>
//       <div>
//         <label>Create Password:</label>
//         <input type='text' onChange={e => setUser({...user, password: e.target.value})}></input>
//       </div>
//       <div>
//           <button onClick={handleClick}>Submit</button>
//       </div>
//     {/* <Link to="/home"><img className = "homepageButton" src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfo2GGfKVvP2pRbnHwCVLFYiUVhhRXqQy1Zd_s1ZuQUQhW9GiXq3iD2WTHi3DlAdtba84&usqp=CAU'></img></Link> */}
//   </div>
//   )
// }

import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './Signup.css'

const Signup = () => {

  const [user, setUser] = useState({username: '', password: ''})

  const handleClick = (e) => {

    e.preventDefault();
    dispatchEvent(login(user));
  }
  return(
  <div className = "signUpPage">
      <div>
        {/* <label>Create Username:</label> */}
        <input className = 'usernameNew' placeholder = "Create Username"type='text' onChange={e => setUser({...user, userName: e.target.value})}></input>
      </div>
      <div>
        {/* <label>Create Password:</label> */}
        <input className = 'passwordNew'placeholder = "Create Password" type='text' onChange={e => setUser({...user, password: e.target.value})}></input>
      </div>
      <div>
          <button className = "submitButton"onClick={handleClick}>Submit</button>
      </div>
    {/* <Link to="/home"><img className = "homepageButton" src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfo2GGfKVvP2pRbnHwCVLFYiUVhhRXqQy1Zd_s1ZuQUQhW9GiXq3iD2WTHi3DlAdtba84&usqp=CAU'></img></Link> */}
  </div>
  )
}




export default Signup;