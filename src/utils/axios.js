import axios from 'axios';
import { API_URL } from 'Config/index';

// ----------------------------------------------------------------------

const axiosPublic = axios.create({
  baseURL: API_URL,
});

const axiosAuth = axios.create({
  baseURL: '/',
});

axiosPublic.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

axiosAuth.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
  // (error) => {
  //   if (error.response.status === 401) {
  //     window.location = '/auth/login';
  //   }
  // }
);

export { axiosPublic, axiosAuth };
