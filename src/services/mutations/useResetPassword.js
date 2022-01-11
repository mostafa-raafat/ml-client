import { useMutation } from 'react-query';
import axiosInstance from 'Utils/axios';

const resetPassword = (password, confirmPassword, token) =>
  axiosInstance.post('/users/auth/reset-password', {
    password,
    confirmPassword,
    token,
  });

export default function useResetPassword() {
  return useMutation(({ password, confirmPassword, token }) => resetPassword(password, confirmPassword, token));
}
