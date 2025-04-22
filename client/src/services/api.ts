import axios from 'axios';
import localforage from 'localforage';

const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

api.interceptors.request.use(async config => {
  if (config.headers.Authorization) return config;

  const token = await localforage.getItem<string>('token');

  config.headers.Authorization = token ? `Bearer ${token}` : '';

  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    if (
      error.response.status === 401 &&
      error.response.data.message === 'Invalid token'
    ) {
      await localforage.removeItem('token');
      await localforage.removeItem('user');
      window.location.href = '/';
    }

    return Promise.reject(error);
  }
);

export { api };
