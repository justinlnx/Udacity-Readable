import { GET_ALL_POSTS, GET_POSTS_BY_CATEGORY } from '../actions';
import { combineReducers } from 'redux';

function posts (state = {}, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
      return {
        posts: action.posts
      }
    case GET_POSTS_BY_CATEGORY: 
      return {
        postsByCategory: action.posts
      }
    default: 
      return state;
  }
}

export default combineReducers({
  posts
});
