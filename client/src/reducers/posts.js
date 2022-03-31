import {
  CREATE,
  DELETE,
  FETCH_ALL,
  FETCH_BY_SEARCH,
  LIKE,
  UPDATE,
} from '../constants/actionTypes';

const initialState = [];

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;

    case FETCH_BY_SEARCH:
      return action.payload;

    case CREATE:
      return [...state, action.payload];

    case UPDATE:
      return state.map(post =>
        post._id === action.payload._id ? action.payload : post
      );

    case DELETE:
      return state.filter(post => post._id !== action.payload);

    case LIKE:
      return state.map(post =>
        post._id === action.payload._id ? action.payload : post
      );

    default:
      return state;
  }
};

export default postsReducer;
