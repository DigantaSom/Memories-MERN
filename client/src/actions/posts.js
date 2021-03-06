import * as api from '../api';
import {
  FETCH_POST,
  FETCH_ALL,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  COMMENT,
} from '../constants/actionTypes';

export const getPost = id => async dispatch => {
  dispatch({ type: START_LOADING });

  try {
    const { data } = await api.fetchPost(id);

    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err);
  }
};

export const getPosts = page => async dispatch => {
  dispatch({ type: START_LOADING });

  try {
    const { data } = await api.fetchPosts(page);

    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err);
  }
};

export const getPostsBySearch = searchQuery => async dispatch => {
  dispatch({ type: START_LOADING });

  try {
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post, navigate) => async dispatch => {
  dispatch({ type: START_LOADING });

  try {
    const { data } = await api.createPost(post);
    dispatch({
      type: CREATE,
      payload: data,
    });
    navigate(`/posts/${data._id}`);
  } catch (err) {
    console.log(err);
  }
};

export const updatePost = (id, post) => async dispatch => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({
      type: UPDATE,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = id => async dispatch => {
  try {
    await api.deletePost(id);
    dispatch({
      type: DELETE,
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
};

export const likePost = id => async dispatch => {
  try {
    const { data } = await api.likePost(id);
    dispatch({
      type: LIKE,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const commentPost = (comment, postId) => async dispatch => {
  try {
    const { data } = await api.commentOnPost(comment, postId);
    dispatch({
      type: COMMENT,
      payload: data,
    });
    return data.comments;
  } catch (error) {
    console.log(error);
  }
};
