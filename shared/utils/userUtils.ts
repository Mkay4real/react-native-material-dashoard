import {AxiosResponse} from 'axios';
import axios from '../helpers/user/axios';

const getData = async <T>(response: Promise<AxiosResponse<T>>) => {
  const {data} = await response;
  return data;
};

export const get = <returnType>(url: string) => {
  return () => getData<returnType>(axios.get(url));
};

// export const getWithConfig = <returnType>(url: string) => {
//   return (config: AxiosRequestConfig) => {
//     return getData(axios.get<returnType>(url, config));
//   };
// };

export const post = <argType, returnType = any>(url: string) => {
  return (data: argType) => {
    return getData(axios.post<returnType>(url, data));
  };
};

// export const postWithConfig = <argType, returnType = any>(url: string) => {
//   return (config: AxiosRequestConfig) => {
//     return (data: argType) => {
//       return getData(axios.post<returnType>(url, data, config));
//     };
//   };
// };

export const put = <argType, returnType = any>(url: string) => {
  return (data: argType) => {
    return getData(axios.put<returnType>(url, data));
  };
};
