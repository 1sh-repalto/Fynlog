import axios from 'axios';
import { logout } from './auth';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => (error ? prom.reject(error) : prom.resolve(token)));
  failedQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if ((err.response?.status === 401 || err.response?.status === 403) && !original._retry) {
      if (isRefreshing) {
        return new Promise((res, rej) => {
          failedQueue.push({ resolve: res, reject: rej });
        })
          .then(() => api(original))
          .catch(Promise.reject);
      }

      original._retry = true;
      isRefreshing = true;

      try {
        console.log('refreshing token');

        await api.post('/auth/refresh');
        processQueue(null);
        return api(original);
      } catch (error) {
        processQueue(error, null);
        logout();
        window.location.href = '/auth';
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(err);
  },
);

export default api;
