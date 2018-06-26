import axios from "axios";
import { POST_LOADING, ADD_POST, GET_ERRORS, GET_POSTS } from "./types";

//GET posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get("/api/posts")
    .then(res => {
      dispatch({
        type: GET_POSTS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_POSTS,
        payload: null
      });
    });
};

//ADD post
export const addPost = postData => dispatch => {
  axios
    .post("/api/posts/createPost", postData)
    .then(res => {
      dispatch({
        type: ADD_POST,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//profile loading
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
