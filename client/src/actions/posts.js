import * as api from '../api';

export const FETCH_ALL = 'FETCH_ALL';
export const CREATE = 'CREATE';
export const UPDATE = 'UPDATE';

export const getPosts = () => async dispatch => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({
      type: FETCH_ALL,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const createPost = post => async dispatch => {
  try {
    const { data } = await api.createPost(post);
    dispatch({
      type: CREATE,
      payload: data,
    });
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
