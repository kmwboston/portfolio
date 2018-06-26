import axios from "axios";
import {
  POST_LOADING,
  ADD_POST,
  GET_ERRORS,
  GET_POSTS,
  GET_POST
} from "./types";

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

//GET post
export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/${id}`)
    .then(res => {
      dispatch({
        type: GET_POST,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_POST,
        payload: null
      });
    });
};

//ADD post
export const addPost = (postData, history) => dispatch => {
  axios
    .post("/api/posts/createPost", postData)
    .then(res => {
      dispatch({
        type: ADD_POST,
        payload: res.data
      });
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//ADD post
export const editPost = (postData, id, history) => dispatch => {
  axios
    .put(`/api/posts/${id}`, postData)
    .then(res => history.push("/dashboard"))
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
