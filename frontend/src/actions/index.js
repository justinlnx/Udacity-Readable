import { api, headers } from '../utils';

export const GET_ALL_POSTS = 'GET_ALL_POSTS';
export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORY';
export const CREATE_POST_SUCCEEDED = 'CREATE_POST_SUCCEEDED';
export const DELETE_POST_SUCCEEDED = 'DELETE_POST_SUCCEEDED';
export const UPDATE_POST_SUCCEEDED = 'UPDATE_POST_VOTE_SCORE_SUCCEEDED';
export const RECEIVE_POST_COMMENTS = 'RECEIVE_POST_COMMENTS';
export const UPDATE_POST_COMMENT_SUCCEEDED = 'UPDATE_POST_COMMENT_SUCCEEDED';
export const CREATE_COMMENT_SUCCEEDED = 'CREATE_COMMENT_SUCCEEDED';

export function getAllPosts () {
  return function(dispatch) {
    return fetch(`${api}/posts`, { headers })
      .then(res => res.json())
      .then(json => dispatch(receivePosts(json, GET_ALL_POSTS)));
  }
}

function receivePosts(posts, type) {
  return {
    type: type,
    posts,
  }
}

export function getPostsByCategory (category) {
  return function(dispatch) {
    return fetch(`${api}/${category.toLowerCase()}/posts`, { headers })
      .then(res => res.json())
      .then(json => dispatch(receivePosts(json, GET_POSTS_BY_CATEGORY)));
  }
}

export function CreatePost(title, author, bodyContent, category) {
  let id = Math.random().toString(36).substr(-8);
  let timestamp = Date.now();
  let body = JSON.stringify({
    "title": title,
    "author": author,
    "body": bodyContent,
    "category": category,
    "timestamp": timestamp,
    "id": id
  });
  return function(dispatch) {
    return fetch(`${api}/posts`, {
      method: 'POST',
      headers: headers,
      body
    })
    .then(res => res.json())
    .then(json => dispatch(CreatePostSucceeded(json)));
  }
}

function CreatePostSucceeded(json) {
  return {
    type: CREATE_POST_SUCCEEDED,
    post: json
  }
}

export function DeletePost(id) {
  return function(dispatch) {
    return fetch(`${api}/posts/${id}`, {
      method: 'DELETE',
      headers: headers
    })
    .then(res => {
      if(res.status === 200) {
        return res.json().then(json => {
          dispatch(DeletePostSucceeded(json));
        })
      }
    })
  }
}

function DeletePostSucceeded(json) {
  return {
    type: DELETE_POST_SUCCEEDED,
    post: json
  }
}

export function UpdatePostVoteScore(id, option) {
  let body = JSON.stringify({
    "id": id,
    "option": option
  });
  return function(dispatch) {
    return fetch(`${api}/posts/${id}`, {
      method: 'POST',
      headers: headers,
      body
    })
    .then(res => res.json())
    .then(json => dispatch(UpdatePostSucceeded(json)));
  }
}

function UpdatePostSucceeded(json) {
  return {
    type: UPDATE_POST_SUCCEEDED,
    post: json
  }
}

export function UpdatePost(id, title, content) {
  let body = JSON.stringify({
    "title": title,
    "body": content
  });
  return function(dispatch) {
    return fetch(`${api}/posts/${id}`, {
      method: 'PUT',
      headers: headers,
      body
    })
    .then(res => res.json())
    .then(json => dispatch(UpdatePostSucceeded(json)));
  }
}

export function GetCommentsByPost(postId) {
  return function(dispatch) {
    return fetch(`${api}/posts/${postId}/comments`, { headers })
      .then(res => res.json())
      .then(json => dispatch(ReceivePostComments(json)));
  }
}

function ReceivePostComments(json) {
  return {
    type: RECEIVE_POST_COMMENTS,
    comments: json
  }
}

export function UpdateCommentVoteScore(id, option) {
  let body = JSON.stringify({
    "id": id,
    "option": option
  });
  return function(dispatch) {
    return fetch(`${api}/comments/${id}`, {
      method: 'POST',
      headers: headers,
      body
    })
    .then(res => res.json())
    .then(json => dispatch(UpdatePostCommentSucceeded(json)));
  }
}

function UpdatePostCommentSucceeded(json) {
  return {
    type: UPDATE_POST_COMMENT_SUCCEEDED,
    comment: json
  }
}

export function CreateComment(postId, author, bodyContent) {
  let id = Math.random().toString(36).substr(-8);
  let timestamp = Date.now();
  let body = JSON.stringify({
    "author": author,
    "body": bodyContent,
    "timestamp": timestamp,
    "id": id,
    "parentId": postId
  });
  return function(dispatch) {
    return fetch(`${api}/posts`, {
      method: 'POST',
      headers: headers,
      body
    })
    .then(res => res.json())
    .then(json => dispatch(CreateCommentSucceeded(json)));
  }
}

function CreateCommentSucceeded(json) {
  return {
    type: CREATE_COMMENT_SUCCEEDED,
    comment: json
  }
}
