import { useMutation } from 'react-query';
import { axiosPublic } from 'Utils/axios';

const forgetPassword = (email) =>
  axiosPublic.post('/users/auth/forgot-password', {
    email,
  });

export default function useForgetPassword() {
  return useMutation(({ email }) => forgetPassword(email));
}
