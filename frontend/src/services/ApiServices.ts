import axios, { AxiosInstance, AxiosError } from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

class ApiService {
  private api: AxiosInstance;

  constructor(token?: string) {
    this.api = axios.create({
      baseURL,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }

  setToken(token: string) {
    this.api.defaults.headers.Authorization = `Bearer ${token}`;
  }

  get(endpoint: string, params = {}) {
    return this.api
      .get(endpoint, { params })
      .then((response) => response.data)
      .catch((error:AxiosError) => {
        throw error.response?.data || error.message;
      });
  }

  post(endpoint: string, data = {}) {
    return this.api
      .post(endpoint, data)
      .then((response) => response.data)
      .catch((error:AxiosError) => {
        throw error.response?.data || error.message;
      });
  }

  put(endpoint: string, data = {}) {
    return this.api
      .put(endpoint, data)
      .then((response) => {
        console.log('response:', response.data);
        return response.data;
      })
      .catch((error:AxiosError) => {
        throw error.response?.data || error.message;
      });
  }

  patch(endpoint: string, data = {}) {
    return this.api
      .patch(endpoint, data)
      .then((response) => response.data)
      .catch((error:AxiosError) => {
        throw error.response?.data || error.message;
      });
  }

  delete(endpoint: string) {
    return this.api
      .delete(endpoint)
      .then((response) => response.data)
      .catch((error:AxiosError) => {
        throw error.response?.data || error.message;
      });
  }
}

export default ApiService;
