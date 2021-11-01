import { GET_ERRORS, SET_CURRENT_USER } from "./types";

import jwt_decode from "jwt-decode";

import axios from "axios";
import setAuthToken from "./../utility/setAuthToken";

// Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/register", userData)
    .then((res) => history.push("/login"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
// login user
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      // save to localstorage
      const { token } = res.data;
      console.log(token)
      //set token to ls
      localStorage.setItem("jwtToken", token);
      // set token to auth header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);
      // set current user

      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
         })
    
    ) 
};
// set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// Log user out

export const logoutUser = ()=>dispatch=>{
   //Remove token from localstorage
   localStorage.removeItem('jwtToken')
   // remove auth header for future request
   setAuthToken(false)
   // set current user to {} which will isAuthenticated to false
   dispatch(setCurrentUser({}))


}
