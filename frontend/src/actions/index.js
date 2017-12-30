import { api, AuthToken, headers } from '../utils';

export const GET_ALL_POSTS = 'GET_ALL_POSTS';
export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORY';
export const CREATE_POST_SUCCEEDED = 'CREATE_POST_SUCCEEDED';

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
      headers: {
        'Authorization': AuthToken,
        'Content-Type': 'application/json',
      },
      body
    })
    .then(res => res.json())
    .then(json => dispatch(CreatePostSuceeded(json)));
  }
}

function CreatePostSuceeded(json) {
  return {
    type: CREATE_POST_SUCCEEDED,
    post: json
  }
}