import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const fetchPosts = async () => {
    const response = await axios.get(`${API_BASE_URL}/posts`);
    return response.data;
};

export const fetchPostById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/posts/${id}`);
  return response.data;
};

export const createPost = async (postData: any) => {
  const response = await axios.post(`${API_BASE_URL}/posts`, postData);
  return response.data;
};

export const updatePost = async (id: string, postData: any) => {
  const response = await axios.patch(`${API_BASE_URL}/posts/${id}`, postData);
  return response.data;
};

export const deletePost = async (id: string) => {
  await axios.delete(`${API_BASE_URL}/posts/${id}`);
};

export const searchPosts = async (query: string) => {
  const response = await axios.get(`${API_BASE_URL}/posts/search?q=${query}`);
  return response.data;
};

export const exportPosts = async () => {
    return axios.get(`${API_BASE_URL}/posts/export`, { responseType: 'blob' });
};

export const fetchComments = async (postId: string) => {
  const response = await axios.get(`${API_BASE_URL}/comments/${postId}/comments`);
  return response.data;
};

export const addComment = async (postId: string, commentData: any) => {
  const response = await axios.post(`${API_BASE_URL}/comments/${postId}/comments`, commentData);
  return response.data;
};

export const deleteComment = async (postId: string, commentId: string) => {
  await axios.delete(`${API_BASE_URL}/comments/${postId}/comments/${commentId}`);
};

