import {
  GET_ALL_POSTS,
  GET_POSTS_BY_CATEGORY,
  CREATE_POST_SUCCEEDED,
  DELETE_POST_SUCCEEDED,
  UPDATE_POST_SUCCEEDED
} from '../actions';
import { combineReducers } from 'redux';

function posts (state = {}, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
      return {
        posts: action.posts
      }
    case GET_POSTS_BY_CATEGORY: 
      return {
        posts: action.posts
      }
    case CREATE_POST_SUCCEEDED: 
      state.posts.push(action.post);
      return {
        posts: state.posts
      }
    case DELETE_POST_SUCCEEDED: 
      return {
        posts: state.posts.filter(x => x.id !== action.post.id)
      }
    case UPDATE_POST_SUCCEEDED:
      state.posts.find(x => x.id === action.post.id).voteScore = action.post.voteScore;
      state.posts.find(x => x.id === action.post.id).title = action.post.title;
      state.posts.find(x => x.id === action.post.id).body = action.post.body;
      return {
        posts: state.posts
      }
    default: 
      return state;
  }
}

export default combineReducers({
  posts
});
