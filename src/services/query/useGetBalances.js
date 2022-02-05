import { useQuery } from 'react-query';
import { axiosAuth } from 'Utils/axios';

export const getBalances = async (ctx) => {
  const { data } = await axiosAuth.get('http://localhost:3222/api/balances', {
    headers: ctx?.req?.headers?.cookie ? { cookie: ctx.req.headers.cookie } : undefined,
    withCredentials: true,
  });
  return data;
};

export default function useGetBalances() {
  return useQuery('balances', () => getBalances());
}
