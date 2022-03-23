import { CREATE, FETCH_ALL } from '../actions/posts';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;

    case CREATE:
      return state;

    default:
      return state;
  }
};
