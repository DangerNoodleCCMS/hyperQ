import { LOGIN_ACTION, LOGOUT_ACTION, UPDATE_MEDIA } from './types'
//Sample Login Function
export function login(payload) {
  // return dispatch => {
  //   fetch('http://localhost:3000/sign_up', 
  //     method: 'POST',
  //     headers: {"Content-Type": "application/json"},
  //     body: JSON.stringify(data))
  //     .then(res => res.json())
  //     .then(res => {
  //   dispatch(type: LOGIN_ACTION, payload: {id: res.id, username: res.username}}
  // })
  console.log("Data in functions.js", payload);
  return {
    type: LOGIN_ACTION,
    payload: payload
  }
}
//Sample Logout Function
export function logout() {
//  return => {
//    dispatch(type: LOGOUT_ACTION)
//  }
}

export function updateMedia(data) {
  return {
    type: UPDATE_MEDIA,
    payload: data
  }
}

