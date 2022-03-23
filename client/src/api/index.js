import axios from 'axios';

const ENDPOINT = 'http://localhost:4000/posts';

export const fetchPosts = () => axios.get(ENDPOINT);
