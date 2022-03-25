import axios from 'axios';

const ENDPOINT = 'http://localhost:4000/posts';

export const fetchPosts = () => axios.get(ENDPOINT);
export const createPost = newPost => axios.post(ENDPOINT, newPost);
export const updatePost = (id, post) => axios.patch(`${ENDPOINT}/${id}`, post);
export const deletePost = id => axios.delete(`${ENDPOINT}/${id}`);
