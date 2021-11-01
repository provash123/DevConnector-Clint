import axios from 'axios'
import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE, SET_CURRENT_USER, GET_PROFILES } from './types';

//Get current profile
export const getCurrentProfile = ()=>dispatch=>{
    dispatch(setProfileLoading())
    axios.get('/api/profiles')
        .then(res=>(
            dispatch({
                type:GET_PROFILE,
                payload:res.data
            })
        ))
        .catch(err=>(
            dispatch({
                type:GET_PROFILE,
                payload:{}
            })
        ))
}

// Get profile by Handle
export const getProfileByHandle = (handle)=>dispatch=>{
    dispatch(setProfileLoading())
    axios.get(`/api/profiles/handle/${handle}`)
        .then(res=>(
            dispatch({
                type:GET_PROFILE,
                payload:res.data
            })
        ))
        .catch(err=>(
            dispatch({
                type:GET_PROFILE,
                payload:null
            })
        ))
}

// Create profile
 
    export const createProfile = (profileData, history) => dispatch => {
        axios
          .post('/api/profiles', profileData)
          .then(res => history.push('/dashboard'))
          .catch(err =>
            dispatch({
              type: GET_ERRORS,
              payload: err.response.data
            })
          );
      };
  // Add Experience
      export const addExperience =(expData,history)=>dispatch=>{
          axios
             .post('/api/profiles/experience',expData)
             .then(res=>history.push('/dashboard'))
             .catch(err=>
                dispatch({
                    type:GET_ERRORS,
                    payload:err.response.data
                })
                )
      }

       // Delete Experience
       export const deleteExperience =(id)=>dispatch=>{
        axios
           .delete(`/api/profiles/experience/${id}`)
           .then(res=>
             dispatch({
                 type:GET_PROFILE,
                 payload:res.data
             })
            )
           .catch(err=>
              dispatch({
                  type:GET_ERRORS,
                  payload:err.response.data
              })
              )
    }

      // Add Education
      export const addEducation =(eduData,history)=>dispatch=>{
        axios
           .post('/api/profiles/education',eduData)
           .then(res=>history.push('/dashboard'))
           .catch(err=>
              dispatch({
                  type:GET_ERRORS,
                  payload:err.response.data
              })
              )
    }
   // Delete education
    export const deleteEducation =(id)=>dispatch=>{
        axios
           .delete(`/api/profiles/education/${id}`)
           .then(res=>
             dispatch({
                 type:GET_PROFILE,
                 payload:res.data
             })
            )
           .catch(err=>
              dispatch({
                  type:GET_ERRORS,
                  payload:err.response.data
              })
              )
    }

      // Delete account and profile

      export const deleteAccount =()=>dispatch=>{
          if(window.confirm('Are you sure?This can Not be undone?'))
           axios.delete('/api/profiles')
           .then(res=>
              dispatch({
                  type:SET_CURRENT_USER,
                  payload:{}
              })
            ).catch(err=>
                dispatch({
                    type:GET_ERRORS,
                    payload:err.response.data
                })
                )
      }
      // Get All profiles
      export const getProfiles = ()=>dispatch=>{
        dispatch(setProfileLoading())
          axios.get('api/profiles/all')
             .then(res=>
                dispatch({
                    type:GET_PROFILES,
                    payload:res.data
                })
                )
                .catch(err=>
                    dispatch({
                        type:GET_PROFILES,
                        payload:null
                    })
                    )
      }

// Profile Loading
export const setProfileLoading = ()=>{
    return {
        type:PROFILE_LOADING
    }
}
// clear profile
export const clearCurrentProfile = ()=>{
    return {
        type:CLEAR_CURRENT_PROFILE
    }
}