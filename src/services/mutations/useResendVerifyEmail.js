import { useMutation } from 'react-query';
import { axiosPublic } from 'Utils/axios';

const resendVerifyEmail = (token) =>
  axiosPublic.post('/users/auth/resend-verify-email', {
    token,
  });

export default function useResendVerifyEmail() {
  return useMutation(({ token }) => resendVerifyEmail(token));
}
