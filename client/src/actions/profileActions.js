import axios from 'axios'
import {
  GET_PROFILE,
  GET_PROFILES,
  SET_CURRENT_USER,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE
} from './types'
//GET CURRENT PROFILE
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading())
  axios
    .get('http://localhost:5000/api/profile')
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    })
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    )
}
//Get Profile By handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading())
  axios
    .get(`http://localhost:5000/api/profile/handle/${handle}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    })
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    )
}
//Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('http://localhost:5000/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}
//PROFILE LOADING
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}
//Clear Profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
}
//Delete Account
export const deleteAccount = () => dispatch => {
  if (window.confirm("Buddy you're sure right")) {
    axios
      .delete('http://localhost:5000/api/profile')
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRROS,
          payload: err.response.data
        })
      )
  }
}
//addExpereince actions
export const addExperience = (data, history) => dispatch => {
  axios
    .post('http://localhost:5000/api/profile/experience', data)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}
//addEducation action
export const addEducation = (data, history) => dispatch => {
  axios
    .post('http://localhost:5000/api/profile/education', data)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}
//Delete Expereince
export const deleteExpereince = id => dispatch => {
  axios
    .delete(`http://localhost:5000/api/profile/experience/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}
//Delete Education
export const deleteEducation = id => dispatch => {
  axios
    .delete(`http://localhost:5000/api/profile/education/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

//Get All Profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading())
  axios
    .get(`http://localhost:5000/api/profile/all`)
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    )
}
