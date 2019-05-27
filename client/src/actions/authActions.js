import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import { GET_ERRORS, SET_CURRENT_USER } from './types'
import jwt_decode from 'jwt-decode'

//Register User
export const registeruser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}
//Login Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      //Save To localStorage
      const { token } = res.data

      //Set Token to Local Storage
      localStorage.setItem('jwtToken', token)
      //Set token to auth Header
      setAuthToken(token)
      //Decode token to get user data
      const decoded = jwt_decode(token)
      //Set Current User
      dispatch(setCurrentUser(decoded))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}
//Set Logged In User
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}
//Log User Out
export const logoutUser = () => dispatch => {
  //Remove Token from localstorage
  localStorage.removeItem('jwtToken')
  //Remove auth Header for future requesrts
  setAuthToken(false)
  //Set current user to { which will set isAuthenticated to false
  dispatch(setCurrentUser({}))
}
