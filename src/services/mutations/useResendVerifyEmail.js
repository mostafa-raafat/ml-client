import { useMutation } from 'react-query';
import axiosInstance from 'Utils/axios';

const resendVerifyEmail = (token) =>
  axiosInstance.post('/users/auth/resend-verify-email', {
    token,
  });

export default function useResendVerifyEmail() {
  return useMutation(['resendVerifyEmail'], ({ token }) => resendVerifyEmail(token));
}
