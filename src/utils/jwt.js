import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { verify, sign } from 'jsonwebtoken';
// utils
import axios from 'Utils/axios';
// config
import { cookiesKey } from 'Config/index';

// ----------------------------------------------------------------------

// const handleTokenExpired = (exp) => {
//   let expiredTimer;

//   window.clearTimeout(expiredTimer);
//   const currentTime = Date.now();
//   const timeLeft = exp * 1000 - currentTime;
//   console.log(timeLeft);
//   expiredTimer = window.setTimeout(() => {
//     console.log('expired');
//     // You can do what ever you want here, like show a notification
//   }, timeLeft);
// };

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
};

const getToken = () => Cookies.get(cookiesKey.accessToken);

const setSession = (accessToken) => {
  const decoded = jwtDecode(accessToken);
  Cookies.set(cookiesKey.accessToken, accessToken, { expires: new Date(decoded.exp * 1000) });
  axios.defaults.headers.common.Authorization = `JWT ${accessToken}`;
  // This function below will handle when token is expired
  // const { exp } = jwtDecode(accessToken);
  // handleTokenExpired(exp);
};

const removeSession = () => {
  Cookies.remove(cookiesKey.accessToken);
  delete axios.defaults.headers.common.Authorization;
};

export { isValidToken, getToken, setSession, removeSession, verify, sign };
