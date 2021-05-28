import axios from 'axios';
import qs from 'query-string';
import { axiosGlobals } from '../utils/utils';
import Toast from 'react-native-simple-toast';

export const getToken = async () => {
  try {
    const {data} = await axios.post(
     'http://154.113.19.214/auth-service/oauth/token',
      qs.stringify({
        grant_type: 'client_credentials',
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

    axiosGlobals(data.access_token);

    return data.access_token;
  } catch (e) {
    const msg = e?.response?.data.error_description;
    console.log('token error', e, msg);
    Toast.show("App Authorization failed");
    throw new Error(msg);
  }
};

export const refreshToken = () => {};
