import { useMutation, useQueryClient } from 'react-query';
import axiosInstance from 'Utils/axios';

const createBalance = (code) =>
  axiosInstance.post('/balances', {
    currencyCode: code,
  });

export default function useCreateBalance() {
  const queryClient = useQueryClient();
  return useMutation(({ code }) => createBalance(code), {
    onSuccess: () => queryClient.invalidateQueries(['balances']),
  });
}
