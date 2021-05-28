import axios from 'axios';
import { ONBOARDING_SERVICE_HOST } from '../../utils/utils';
import appAuthStore from '../../stores/appAuth';

const instance = axios.create({
  baseURL: ONBOARDING_SERVICE_HOST,
  headers: {
    Accept: 'application/json',
  },
});

instance.interceptors.request.use((request) => {
  const { token } = appAuthStore.getState();

  console.log(`[${request.method}]: ${request.url}`);

  request.headers.xCLIENT = 'MOBILE';
  request.headers.Authorization = `bearer ${token}`;

  return request;
});

instance.interceptors.response.use((response) => {
  console.log(`[axios response]: [${response.status}]: ${JSON.stringify(response)}`);

  return Promise.resolve(response);

}, (error) => {
  console.log(`[axios error]: ${JSON.stringify(error?.response)}`);

  return Promise.reject(error);

})

export const updateCustomerHash = (correlationId : string) =>{
  instance.defaults.headers['CustomerHash']= correlationId;
}
export default instance;
