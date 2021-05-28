import axios from 'axios';
import { APPROVAL_SERVICE_HOST } from '../../utils/utils';
import appAuthStore from '../../stores/appAuth';

const instance = axios.create({
  baseURL: APPROVAL_SERVICE_HOST,
  headers: {
    Accept: 'application/json',
  },
});

instance.interceptors.request.use((request) => {
  const { approvalToken } = appAuthStore.getState();

  console.log(`[${request.method}]: ${request.url}`);

  request.headers.xCLIENT = 'MOBILE';
  request.headers.Authorization = `bearer ${approvalToken}`;

  return request;
});

instance.interceptors.response.use((response) => {
  console.log(`[axios response]: [${response.status}]: ${JSON.stringify(response)}`);

  return Promise.resolve(response);

}, (error) => {
  console.log(`[axios error]: ${JSON.stringify(error?.response)}`);

  return Promise.reject(error);

})

export default instance;
