import {AxiosResponse} from 'axios';
import axios from '../helpers/onboarding/axios';
import { Alert } from 'react-native';

export const baseURL = 'http://154.113.19.214';
export const ONBOARDING_SERVICE_HOST = 'http://154.113.19.214/onboarding-service';
export const AUTH_SERVICE_HOST = 'http://154.113.19.214/auth-service';
export const APPROVAL_SERVICE_HOST = 'http://154.113.19.214/approval-service';
export const USER_SERVICE_HOST = 'http://154.113.19.214/admin-service';

type AlertType= {title?: string, message: string};

export const notify = (content: AlertType) => Alert.alert(content.title || "Alert", content.message);

export const now = () => Date.now().toString();

export const randomString = (len: number, charSet?: string)=> {
  charSet = charSet || 'ABCDEFGHJKLMNPQRTWXY346789';
  var randomString = '';
  for (var i = 0; i < len; i++) {
      var randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomString;
}

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


export const axiosGlobals = (token : string) => {
  if (token) { axios.defaults.headers['Authorization'] = `Bearer ${token}` };
  axios.defaults.baseURL = `${baseURL}/onboarding-service`;
  //axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  axios.defaults.headers['xCLIENT'] = 'MOBILE';
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
};
