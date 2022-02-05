import { useQuery } from 'react-query';
import { axiosAuth } from 'Utils/axios';

export const getBalance = async (id, token) => {
  return await axiosAuth.get(`http://localhost:3222/api/balances/${id}`, {
    headers: {
      Cookie: `access=${token};`,
    },
    withCredentials: true,
  });
};

export default function useGetBalance(id) {
  return useQuery(['balance', id], () => getBalance(id));
}
