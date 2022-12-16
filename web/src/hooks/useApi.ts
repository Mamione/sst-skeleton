import axios, { AxiosRequestConfig } from 'axios';

export const API_URL = import.meta.env.VITE_API_URL;

const useApi = () => {
  const get = async (endpoint: string, token?: string) => {
    try {
      let options: AxiosRequestConfig<unknown> = { headers: { 'Content-Type': 'application/json' } };
      if (token) options = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } };
      return await axios.get(API_URL + endpoint, options);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    get
  };
};

export default useApi;
