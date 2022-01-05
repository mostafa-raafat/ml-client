import { useMutation } from 'react-query';
import axiosInstance from 'Utils/axios';

const verifyEmail = (token, code) =>
  axiosInstance.post('/users/auth/verify-email', {
    token,
    code,
  });

export default function useVerifyEmail() {
  return useMutation(['verifyEmail'], ({ token, code }) => verifyEmail(token, code));
}
