import axios from 'axios';
import qs from 'query-string';
import { AUTH_SERVICE_HOST } from '../utils/utils';

export const getUserToken = async () => {
  try {
    const {data} = await axios.post(
     AUTH_SERVICE_HOST+'/oauth/token',
      qs.stringify({
        // client_secret: 'secret',
        grant_type: 'password',
        password:  'Computer1_',
        username:  'system|system_maker@system.com',

      }),
      {
        auth: {
          password: 'system1',
          username: 'ONBOARDING',
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      },
    );

    return data.access_token;
  } catch (e) {
    const msg = e?.response?.data.error_description;
    console.log('user token error', e, msg);
    throw new Error(msg);
  }
};

export const refreshToken = () => {};
