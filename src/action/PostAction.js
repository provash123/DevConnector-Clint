import axios from 'axios'

import { ADD_POST, DELETE_POST, GET_ERRORS, CLEAR_ERRORS, GET_POST, GET_POSTS, POST_LOADING } from './types';

//Add post
export const addPost = postdata=>dispatch=>{
    dispatch(clearErrors())
       axios
         .post('/api/posts',postdata)
         .then(res=>
            dispatch({
                type: ADD_POST,
                payload: res.data

            })
            ).catch(err=>
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
                )
}

// Add comment
//Add post
export const addComment = (postId,commentData)=>dispatch=>{
    dispatch(clearErrors())
    axios
      .post(`/api/posts/comment/${postId}`,commentData)
      .then(res=>
         dispatch({
             type: GET_POST,
             payload: res.data

         })
         ).catch(err=>
             dispatch({
                 type: GET_ERRORS,
                 payload: err.response.data
             })
             )
}

//Delete Comment
export const deleteComment = (postId,commentId)=>dispatch=>{
    axios
      .delete(`/api/posts/comment/${postId}/${commentId}`)
      .then(res=>
         dispatch({
             type: GET_POST,
             payload: res.data

         })
         ).catch(err=>
             dispatch({
                 type: GET_ERRORS,
                 payload: err.response.data
             })
             )
}


//Get posts
export const getPosts=()=>dispatch=>{
    dispatch(postLoading())
    axios
      .get('/api/posts')
      .then(res=>
         dispatch({
             type: GET_POSTS,
             payload: res.data

         })
         ).catch(err=>
             dispatch({
                 type: GET_POSTS,
                 payload: null
             })
             )
}
 // Get Post
export const getPost=(id)=>dispatch=>{
   
    axios
      .get(`/api/posts/${id}`)
      .then(res=>
         dispatch({
             type: GET_POST,
             payload: res.data

         })
         ).catch(err=>
             dispatch({
                 type: GET_POST,
                 payload: null
             })
             )
}

//Delete post
export const deletePost = id=>dispatch=>{
    axios
      .delete(`/api/posts/${id}`)
      .then(res=>
         dispatch({
             type: DELETE_POST,
             payload: id

         })
         ).catch(err=>
             dispatch({
                 type: GET_ERRORS,
                 payload: err.response.data
             })
             )
}

//Like post
export const addLike = id=>dispatch=>{
    axios
      .post(`/api/posts/like/${id}`)
      .then(res=>dispatch(getPosts())
      )
        .catch(err=>
             dispatch({
                 type: GET_ERRORS,
                 payload: err.response.data
             })
             )
}

//UnLike post
export const removeLike = id=>dispatch=>{
    axios
      .post(`/api/posts/unlike/${id}`)
      .then(res=>dispatch(getPosts())
      )
        .catch(err=>
             dispatch({
                 type: GET_ERRORS,
                 payload: err.response.data
             })
             )
}

export const postLoading = ()=>{
    return{
        type:POST_LOADING
    }
}
// Clear Errors
export const clearErrors = ()=>{
    return{
        type:CLEAR_ERRORS
    }
}
