import {
  GET_ALL_POSTS,
  GET_POST,
  GET_POSTS_BY_CATEGORY,
  CREATE_POST_SUCCEEDED,
  DELETE_POST_SUCCEEDED,
  UPDATE_POST_SUCCEEDED,
  RECEIVE_POST_COMMENTS,
  UPDATE_POST_COMMENT_SUCCEEDED,
  CREATE_COMMENT_SUCCEEDED,
  DELETE_COMMENT_SUCCEEDED
} from '../actions';
import { combineReducers } from 'redux';

function posts (state = {}, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
      return {
        posts: action.posts
      }
    case GET_POST: 
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
    case CREATE_COMMENT_SUCCEEDED:
      state.posts.find(x => x.id === action.comment.parentId).commentCount += 1;
      return state;
    case DELETE_COMMENT_SUCCEEDED:
      state.posts.find(x => x.id === action.comment.parentId).commentCount -= 1;
      return state;
    default: 
      return state;
  }
}

function comments(state = { comments: [] }, action) {
  switch(action.type) {
    case RECEIVE_POST_COMMENTS: 
      state.comments = action.comments;
      return {
        comments: state.comments
      }
    case UPDATE_POST_COMMENT_SUCCEEDED: 
      state.comments.find(x => x.id === action.comment.id).voteScore = action.comment.voteScore;
      state.comments.find(x => x.id === action.comment.id).body = action.comment.body;
      state.comments.find(x => x.id === action.comment.id).timestamp = action.comment.timestamp;
      return state;
    case CREATE_COMMENT_SUCCEEDED:
      state.comments.push(action.comment);
      return state;
    case DELETE_COMMENT_SUCCEEDED:
      return {
        comments: state.comments.filter(x => x.id !== action.comment.id)
      }
    default: 
     return state;
  }
}

export default combineReducers({
  posts,
  comments
});
