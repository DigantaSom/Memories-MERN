import { CREATE, FETCH_ALL } from '../actions/posts';

const initialState = [];

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;

    case CREATE:
      return [...state, action.payload];

    default:
      return state;
  }
};

export default postsReducer;
