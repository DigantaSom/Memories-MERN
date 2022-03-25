import { CREATE, DELETE, FETCH_ALL, LIKE, UPDATE } from '../actions/posts';

const initialState = [];

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL:
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
