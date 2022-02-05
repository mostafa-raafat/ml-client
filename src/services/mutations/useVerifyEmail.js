import { useMutation } from 'react-query';
import { axiosPublic } from 'Utils/axios';

const verifyEmail = (token, code) =>
  axiosPublic.post('/users/auth/verify-email', {
    token,
    code,
  });

export default function useVerifyEmail() {
  return useMutation(({ token, code }) => verifyEmail(token, code));
}
