const api = 'http://penit.herokuapp.com';

let token = localStorage.token;

if (!token) {
  token = localStorage.token = Math.random().toString(36).substr(-8);
}

const headers = {
  'Authorization': token
}

export function getCategories() {
  return fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);
}

export function getAllPosts() {
  return fetch(`${api}/posts`, { headers })
    .then(res => res.json());
}
