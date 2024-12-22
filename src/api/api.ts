import axios from 'axios';
import qs from 'qs';

const API_URL = import.meta.env.VITE_API_URL;

const apiService = axios.create({
  baseURL: API_URL,
});

interface errorValue {
  response: {
    data: {
      message: string;
      code: number;
    };
  };
}

apiService.defaults.headers.common.Accept = 'application/json';

apiService.interceptors.request.use(
  (config: any) => {
    config.paramsSerializer = (params: object) => {
      return qs.stringify(params, {
        arrayFormat: 'brackets',
      });
    };

    return config;
  },
  function (error: string) {
    return Promise.reject(error);
  }
);

apiService.interceptors.response.use(
  function (response: any) {
    return response;
  },
  function (error: errorValue) {
    switch (error.response.data.code) {
      //add general response error handle
      case 401:
        return Promise.resolve(error.response);
      case 404:
        return Promise.reject(error.response.data.message || 'Something went wrong');
      case 400:
        return Promise.resolve(error.response);
      default:
        return Promise.resolve(error.response);
    }
  }
);

export default apiService;
