import { useQuery } from 'react-query';
import axiosInstance from 'Utils/axios';

const getCurrencies = async () => {
  const { data } = await axiosInstance.get('/global/currency');
  return data;
};

export default function useGetCurrencies() {
  return useQuery(['currencies'], () => getCurrencies(), {
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}
