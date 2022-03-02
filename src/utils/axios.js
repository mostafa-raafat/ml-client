import axios from 'axios';
import { API_URL } from 'Config/index';

// ----------------------------------------------------------------------

// Next.js API
const axiosAuth = axios.create({
  baseURL: '/',
});

axiosAuth.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject((error.response && error.response.data) || 'Something went wrong');
  }
);

// ------------------------------------------------------------------------------------------------

// Backend API
const axiosPublic = axios.create({
  baseURL: API_URL,
});

axiosPublic.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

// ------------------------------------------------------------------------------------------------

const ssrHeaders = (access) => ({
  ...(access && {
    headers: {
      Cookie: `access=${access};`,
    },
  }),
});

export { axiosPublic, axiosAuth, ssrHeaders };
