import {
  GET_ALL_POSTS,
  GET_POSTS_BY_CATEGORY,
  CREATE_POST_SUCCEEDED,
  DELETE_POST_SUCCEEDED,
  UPDATE_POST_SUCCEEDED,
  RECEIVE_POST_COMMENTS,
  UPDATE_POST_COMMENT_SUCCEEDED,
  CREATE_COMMENT_SUCCEEDED
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
    // case RECEIVE_POST_COMMENTS:
    //   let newState = Object.assign({}, state);
    //   // reset each post's comment to empty
    //   newState.posts.map(post => {
    //     return post.comments = [];
    //   });
    //   if(action.comments.length !== 0) {
    //     action.comments.map((comment) => {
    //       // let postComments = newState.posts.find(x => x.id === comment.parentId).comments;
    //       // if(postComments && postComments.find(x => x.id === comment.id)) {
    //       //   postComments.find(x => x.id === comment.id).body = comment.body;
    //       //   postComments.find(x => x.id === comment.id).body = comment.timestamp;
    //       //   postComments.find(x => x.id === comment.id).body = comment.voteScore;
    //       // } else {
    //       //   postComments.push(comment);
    //       // }
    //       // newState.posts.find(x => x.id === comment.id).comments = postComments;
    //       // return newState;
    //       return newState.posts.find(x => x.id === comment.parentId).comments.push(comment);
    //     });
    //   }
    //   console.log(newState);
    //   return {
    //     posts: newState.posts
    //   }
    default: 
      return state;
  }
}

function comments(state = { comments: [] }, action) {
  switch(action.type) {
    case RECEIVE_POST_COMMENTS: 
      if(action.comments.length > 0) {
        state.comments = action.comments;
      }
      return {
        comments: state.comments
      }
    case UPDATE_POST_COMMENT_SUCCEEDED: 
      console.log(action.comment);
      state.comments.find(x => x.id === action.comment.id).voteScore = action.comment.voteScore;
      state.comments.find(x => x.id === action.comment.id).body = action.comment.body;
      state.comments.find(x => x.id === action.comment.id).timestamp = action.comment.timestamp;
      return state;
    case CREATE_COMMENT_SUCCEEDED:
      console.log(state.comments);
      console.log(action.comment);
      state.comments.push(action.comment);
      return state;
    default: 
     return state;
  }
}

export default combineReducers({
  posts,
  comments
});
