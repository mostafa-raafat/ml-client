import { useMutation, useQueryClient } from 'react-query';
import { axiosAuth } from 'Utils/axios';

const createBalance = (code) =>
  axiosAuth.post('api/balances', {
    currencyCode: code,
  });

export default function useCreateBalance() {
  const queryClient = useQueryClient();
  return useMutation(({ code }) => createBalance(code), {
    onSuccess: () => queryClient.invalidateQueries(['balances']),
  });
}
