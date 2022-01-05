import { useMutation } from 'react-query';
import axiosInstance from 'Utils/axios';

const forgetPassword = (email) =>
  axiosInstance.post('/users/auth/forgot-password', {
    email,
  });

export default function useForgetPassword() {
  return useMutation(['forgetPassword'], ({ email }) => forgetPassword(email));
}
