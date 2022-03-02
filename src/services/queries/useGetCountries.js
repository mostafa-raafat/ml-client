import { useQuery } from 'react-query';
import { axiosPublic } from 'Utils/axios';

const getCountries = async () => {
  const { data } = await axiosPublic.get('/global/country');
  return data;
};

export default function useGetCountries() {
  return useQuery(['countries'], () => getCountries());
}
