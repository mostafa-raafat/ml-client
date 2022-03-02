import { axiosAuth, ssrHeaders } from 'Utils/axios';

const getBalance = async ({ id, access = false } = {}) => {
  const { data } = await axiosAuth.get(`http://localhost:3222/api/balances/${id}`, {
    ...ssrHeaders(access),
    withCredentials: true,
  });
  return data;
};

const getBalances = async ({ access } = { access: false }) => {
  const { data } = await axiosAuth.get('http://localhost:3222/api/balances', {
    ...ssrHeaders(access),
    withCredentials: true,
  });
  return data;
};

export { getBalances, getBalance };
