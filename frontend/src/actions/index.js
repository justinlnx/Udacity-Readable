import { api, getHeaders } from '../utils';

export const GET_ALL_POSTS = 'GET_ALL_POSTS';
export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORY';

export function getAllPosts () {
  return function(dispatch) {
    return fetch(`${api}/posts`, getHeaders())
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
    return fetch(`${api}/${category.toLowerCase()}/posts`, getHeaders())
      .then(res => res.json())
      .then(json => dispatch(receivePosts(json, GET_POSTS_BY_CATEGORY)));
  }
}
