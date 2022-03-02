import { useQuery } from 'react-query';
import { verifyToken } from './api';

const useVerifyToken = () => {
  return useQuery('verify', () => verifyToken());
};

export { useVerifyToken };
