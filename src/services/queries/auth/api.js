import { axiosAuth, ssrHeaders } from 'Utils/axios';

const verifyToken = async ({ access }) => {
  const { data } = await axiosAuth.get('http://localhost:3222/api/auth/verify/', {
    ...ssrHeaders(access),
    withCredentials: true,
  });
  return data;
};

export { verifyToken };
