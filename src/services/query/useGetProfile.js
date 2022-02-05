import useLazyQuery from 'Hooks/useLazyQuery';
import { useQuery } from 'react-query';
import { axiosAuth } from 'Utils/axios';

const getProfile = async () => {
  const { data } = await axiosAuth.get('/api/auth/user');
  console.log(data);
  return data;
};

export default function useGetProfile() {
  return useLazyQuery(['profile'], getProfile);
}
