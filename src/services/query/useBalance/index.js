import { useQuery } from 'react-query';
import { getBalance, getBalances } from './api';

const useGetBalance = (id, token) => {
  return useQuery(['balance', id], () => getBalance({ id, token }));
};

const useGetBalances = (token) => {
  return useQuery('balances', () => getBalances({ token }));
};

export { useGetBalances, useGetBalance };
