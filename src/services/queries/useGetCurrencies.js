import { useQuery } from 'react-query';
import { axiosPublic } from 'Utils/axios';

const getCurrencies = async () => {
  const { data } = await axiosPublic.get('/global/currency');
  return data;
};

export default function useGetCurrencies() {
  return useQuery(['currencies'], () => getCurrencies(), {
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}
