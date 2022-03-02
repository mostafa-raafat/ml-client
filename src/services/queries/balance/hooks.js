import { useQuery } from 'react-query';
import { getBalance, getBalances } from './api';

const useGetBalance = (id) => {
  return useQuery(['balance', id], () => getBalance({ id }));
};

const useGetBalances = () => {
  return useQuery('balances', () => getBalances());
};

export { useGetBalances, useGetBalance };
