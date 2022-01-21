import { LOGIN_ACTION, LOGOUT_ACTION, UPDATE_MEDIA } from '../actions/types'

const userState = {  
  loggedIn: false,
  user: {id: 0, username: ""},
  mediaList: {},
} 

const userReducer = (state = userState, action) => {                          
switch(action.type) {     
  case LOGIN_ACTION: 
  {  
    console.log('value of loggedIn:', action);
    return {   ...state, user: action.payload, loggedIn: true   } 
  } 
  case LOGOUT_ACTION:
    return firstState 
  case UPDATE_MEDIA:
  {
    console.log("media list in userreducer", action);
    return { ...state, mediaList: action.payload}
  }
  default:    
    return state 
  }
} 

export default userReducer