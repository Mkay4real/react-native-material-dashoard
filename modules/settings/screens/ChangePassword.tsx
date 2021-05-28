import React from 'react';
import { Screen } from 'react-native-screens';
import { Button, PasswordInput } from '../../../exports';
import Spacer from '../../../shared/components/Spacer';

import { useForm } from '../../../form';
import DefaultScreen from '../../../shared/components/DefaultScreen';
import { View } from 'react-native';
import { changePassword } from '../../onboarding/services/api';
import TextInput from '../../../shared/components/TextInput';
import { notify } from '../../../shared/utils/utils';
import SimpleToast from 'react-native-simple-toast';
import NavigationService from '../../../shared/utils/NavigationService';
import ScrollableDefaultScreen from '../../../shared/components/ScrollableDefaultScreen';

const config = { required: true };

export default function ChangePassword() {
  const { values, handlers, error, data, submit, errors, submitted, isSubmitting, onChange } = useForm({
    schema: {
      corporateId: config,
      username: config,
      currentPassword: config,
      password: {
        required: true,
        initialValue: '',
        validate(val) {
          if (String(val)?.length < 6)
            return "Password nust be a minimum of six characters"
        },
      },
      confirmPassword: {
        required: true,
        initialValue: '',
      },
    },
    onSubmit({ confirmPassword, username, corporateId, currentPassword, password }) {
      return changePassword({
        corporateId: corporateId as string,
        username: String(username), newPassword: String(confirmPassword),
        currentPassword: String(currentPassword)
      })
      // return Promise.resolve();
    },
  });

  React.useEffect(() => {
    if (submitted) {
      if (data) {
        notify({ message: data?.message })
        if (data.code == "00") {
          // nav.navigate('PasswordSet');
          SimpleToast.show("Password successfully changed, please proceed to login")
          NavigationService.navigate("Login")

        }
      } else {
        notify({ message: (error as any)?.response?.data?.error })
        console.log('response error', (error as any)?.response?.data);
      }
    }
  }, [submitted]);


  return (
    <ScrollableDefaultScreen
      decorate={false}
      action={{
        label: 'Change Password',
        onPress: submit,
        loading: isSubmitting,
      }}
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
        justifyContent: 'space-between',
      }}
    >
      <View>
        <Spacer gap={30}>
          <TextInput
            mode="outlined"
            label="Enter Corporate ID"
            placeholder="Enter Corporate ID"
            value={values.corporateId as string | undefined}
            onChangeText={onChange.bind(null, 'corporateId')}
          />
          <TextInput
            mode="outlined"
            label="Enter username"
            placeholder="Enter username"
            value={values.username as string | undefined}
            onChangeText={handlers.username.onChange}
          // onChangeText={onChange.bind(null, 'username')}
          />

          <PasswordInput
            label="Enter current password"
            value={values.currentPassword as string | undefined}
            onChangeText={handlers.currentPassword.onChange}
            error={errors.has('currentPassword')}
            errorMessage={errors.get('currentPassword')}
            mode="outlined"
            placeholder="Enter your current password"
          />


          <PasswordInput
            label="Set new password"
            value={values.password as string | undefined}
            // onChangeText={onChange.bind(null, 'password')}
            onChangeText={handlers.password.onChange}
            error={errors.has('password')}
            errorMessage={errors.get('password')}
            mode="outlined"
            // label="Password"
            placeholder="Enter your password"
          />
          <PasswordInput
            label="Confirm new password"
            value={values.confirmPassword as string | undefined}
            // onChangeText={onChange.bind(null, 'confirmPassword')}
            onChangeText={(val) => {
              handlers.confirmPassword.onChange(val)
              // if(String(val) != String(values.password)){
              //   errors.set("confirmPassword", "Passwords must match")
              // }else{
              //   errors.delete("confirmPassword");
              // }
            }}
            error={errors.has('confirmPassword')}
            errorMessage={errors.get('confirmPassword')}
            mode="outlined"
            // label="Confirm password"
            placeholder="Confirm your password"
          />
        </Spacer>
      </View>
    </ScrollableDefaultScreen>
  );
}
