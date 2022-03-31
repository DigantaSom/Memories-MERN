import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:4000' });

// setting the token in the HTTP header of each request, if authenticated
if (localStorage.getItem('profile')) {
  // 'Authorization' can be lowercase as well (in client), but it's strictly lowercase in the server
  API.defaults.headers.common['Authorization'] = `Bearer ${
    JSON.parse(localStorage.getItem('profile')).token
  }`;
}

export const fetchPosts = page => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = searchQuery =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.searchTerm || 'none'}&tags=${
      searchQuery.tags
    }`
  );
export const createPost = newPost => API.post('/posts', newPost);
export const updatePost = (id, post) => API.patch(`/posts/${id}`, post);
export const deletePost = id => API.delete(`/posts/${id}`);
export const likePost = id => API.patch(`/posts/${id}/likePost`);

export const signUp = formData => API.post('/users/signup', formData);
export const signIn = formData => API.post('/users/signin', formData);
