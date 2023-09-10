import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL =
  process.env.NODE_ENV === 'production' ? process.env.REACT_APP_DEPLOY_URL : process.env.REACT_APP_DEV_URL;
class Http {
  axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({ baseURL });
  }

  async request(config: RequestConfig) {
    try {
      const axiosConfig: AxiosRequestConfig = {
        method: config.method,
        url: config.url,
        params: config.query,
        data: config.body,
      };
      const res: AxiosResponse = await this.axiosInstance(axiosConfig);
      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

const http = new Http(BASE_URL || '');

export default http;

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

type RequestConfig = {
  method: HttpMethod;
  url?: string;
  query?: any;
  body?: any;
};
