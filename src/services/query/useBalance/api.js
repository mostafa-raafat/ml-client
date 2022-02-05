import { axiosAuth } from 'Utils/axios';

const getBalance = async ({ id, access }) => {
  const { data } = await axiosAuth.get(`http://localhost:3222/api/balances/${id}`, {
    headers: {
      Cookie: `access=${access};`,
    },
    withCredentials: true,
  });
  return data;
};

const getBalances = async ({ access }) => {
  const { data } = await axiosAuth.get('http://localhost:3222/api/balances', {
    headers: {
      Cookie: `access=${access};`,
    },
    withCredentials: true,
  });
  return data;
};

export { getBalances, getBalance };
