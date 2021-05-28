import { randomString, AUTH_SERVICE_HOST, notify } from '../../../shared/utils/utils';
import { get, post, put } from '../../../shared/utils/userUtils';
// import axios from 'axios';
import axios from '../../../shared/helpers/user/axios';
import qs from 'query-string';

import Biometrics from 'react-native-biometrics';
import { getCredentials, saveCredentials, saveAppCredentials } from '../../../shared/utils/storage';
import userInfoStore from '../../../shared/stores/userInfo';
import NavigationService from '../../../shared/utils/NavigationService';

export const clientLogin = async (username: string, corporate: string, password: string) => {
  try {
    // const set = userInfoStore(({ setDetails }) => setDetails);

    const { data } = await axios.post(
      AUTH_SERVICE_HOST + '/oauth/token',
      qs.stringify({
        grant_type: 'password',
        password: password || 'Computer1_1',
        username: (`${corporate}|${username}`) || 'system|system_maker@system.com',
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
    await saveAppCredentials("client_username", username);
    await saveAppCredentials("client_corporate", corporate);
    await saveAppCredentials("client_password", password);

    userInfoStore.setState({
      corporateId: data?.corporate_id,
      corporateCode: data?.corporate_code, userId: data?.user_id
    });

    Biometrics.isSensorAvailable()
      .then(async (biometryType) => {
        let fpExist = await getCredentials("client_register_finger_print");
        let faceExist = await getCredentials("client_register_face_id");

        if (fpExist || faceExist) {
          return;
        }

        await Biometrics.simplePrompt("Use Biometrics for subsequent login?")
          .then(async () => {
            await saveAppCredentials("client_username", username);
            await saveAppCredentials("client_corporate", corporate);
            await saveAppCredentials("client_password", password);
            await saveAppCredentials("save_client_id", 'true');

            if (biometryType === Biometrics.TouchID && !fpExist) {
              Biometrics.createKeys('Link Fingerprint')
                .then(async (publicKey) => {
                  await saveAppCredentials("client_register_finger_print", publicKey);

                })
                .catch(error => console.log(JSON.stringify(error)));
            }
            if (biometryType === Biometrics.FaceID && !faceExist) {
              Biometrics.createKeys('Link FaceID')
                .then(async (publicKey) => {
                  await saveAppCredentials("client_register_face_id", publicKey);
                })
                .catch(error => console.log(JSON.stringify(error)));
            }
          })
          .catch(() => {
          })

      });

    console.log('Success response', data);
    return data;
  } catch (e) {
    const msg = e?.response?.data.error_description;
    if (String(msg).includes("change")) {
      //Password change is required
      NavigationService.navigate("ChangePassword");
    }
    console.log('Login error', e, msg);
    console.log('Full error', JSON.stringify(e?.response?.data));
    notify({ title: "Authentication Failed!", message: msg });
    throw new Error(msg);
  }
};

export const resetPassword = (corporateId: string, username: string) => {
  const data = {
    "requestHeader": {
      "requestTypeCode": "NEW",
      "menuCode": "4",
      "requestReference": randomString(30),
      "contextUrl": "aaa.com",
      "userSessionId": "aaa.com"
    },
    "corporateId": corporateId || "1",
    "username": username || "system_maker@system.com"
  };
  return post('/v1/user/resetpassword')(data);
};

type ChangePasswordType = {
  corporateId: string
  username: string
  currentPassword?: string
  newPassword?: string

}
export const changePassword = ({ corporateId, username, currentPassword, newPassword }: ChangePasswordType) => {
  const data = {
    "requestHeader": {
      "requestTypeCode": "NEW",
      "menuCode": "4",
      "requestReference": randomString(30),
      "contextUrl": "aaa.com",
      "userSessionId": "aaa.com"
    },
    "corporateId": corporateId || "1",
    "username": username || "system_maker@system.com",
    "currentPassword": currentPassword || "qoscib123",
    "newPassword": newPassword || "Computer1_",
    "confirmNewPassword": newPassword || "Computer1_"

  };
  return post<any>('/v1/user/changepassword')(data);
};
