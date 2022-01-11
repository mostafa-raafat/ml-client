import { useQuery } from 'react-query';
import axiosInstance from 'Utils/axios';

const getCountries = async () => {
  const { data } = await axiosInstance.get('/global/country');
  return data;
};

export default function useGetCountries() {
  return useQuery(['countries'], () => getCountries());
}
