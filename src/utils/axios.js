import axios from "axios";
import firebase from "Utils/firebase";

// config
import { HOST_API } from '../config';


// ----------------------------------------------------------------------

const axiosPublic = axios.create({
  baseURL: HOST_API,
});

const axiosAuth = axios.create({
  baseURL: HOST_API,
});

axiosAuth.interceptors.request.use(
  async (config) => {
    let user = firebase.auth().currentUser;
    config.headers.token = user ? await user.getIdToken(true) : "";
    return config;
  },
  (error) => {
    return Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    );
  }
);

export { axiosPublic, axiosAuth };
