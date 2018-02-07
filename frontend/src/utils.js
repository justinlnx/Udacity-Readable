export const api = 'http://penit.herokuapp.com';
export const AuthToken = 'client-justin'

export const headers = {
  'Authorization': AuthToken,
  'Content-Type': 'application/json'
}

export function getCategories() {
  return fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);
}

export function getPostById (id) {
  return fetch(`${api}/posts/${id}`, { headers })
      .then(res => res.json());
}
