import { useMutation } from 'react-query';
import { axiosPublic } from 'Utils/axios';

const resetPassword = (password, confirmPassword, token) =>
  axiosPublic.post('/users/auth/reset-password', {
    password,
    confirmPassword,
    token,
  });

export default function useResetPassword() {
  return useMutation(({ password, confirmPassword, token }) => resetPassword(password, confirmPassword, token));
}
