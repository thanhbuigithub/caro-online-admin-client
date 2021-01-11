import axios from "axios";
import queryString from "query-string";
import cookieService from "../service/cookieService";
import auth from "../components/common/router/auth";
// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "multipart/form-data",
    "Content-type": "application/json",
    'Accept': 'application/json'
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
  async (config) => {
    // const token = cookieService.get("access_token");
    const token = auth.getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);

export default axiosClient;
