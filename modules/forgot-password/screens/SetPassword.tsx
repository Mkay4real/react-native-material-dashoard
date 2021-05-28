import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import DefaultScreen from '../../../shared/components/DefaultScreen';
import PasswordInput from '../../../shared/components/PasswordInput';
import Spacer from '../../../shared/components/Spacer';
import { useForm } from '../../../form';
import { changePassword } from '../../onboarding/services/api';
import userInfoStore from '../../../shared/stores/userInfo';
import { notify } from '../../../shared/utils/utils';

const config = { required: true };

export default function SetPassword() {
  const nav = useNavigation();

  const { set, corporateId, username, password, newPassword } = userInfoStore(
    ({ corporateId, username, password, newPassword, setDetails, }) => {
      return {
        corporateId,
        username,
        password,
        newPassword,
        set: setDetails,
      };
    },
  );
  const { values, handlers, error, data, submit, errors, submitted, isSubmitting, onChange } = useForm({
    schema: {
      password: {
        required: true,
        initialValue: '',
        validate(val){
          if(String(val)?.length<6)
          return "Password nust be a minimum of six characters"
        },
      },
      confirmPassword: {
        required: true,
        initialValue: '',
      },
    },
    onSubmit({confirmPassword}) {
      return changePassword({corporateId : corporateId as string,
         username: String(username), newPassword: String(confirmPassword),
          currentPassword: String(password)})
      // return Promise.resolve();
    },
  });

  React.useEffect(() => {
    if (submitted) {
      if (data) {
        notify({ message: data?.message })
        data.code=="00" &&
        nav.navigate('PasswordSet');
      } else {
        notify({ message: (error as any)?.response?.data?.error })
        console.log('response error', (error as any)?.response?.data);
      }
    }
  }, [nav, submitted]);

  return (
    <DefaultScreen
      title="Kindly set new password"
      action={{
        label: 'Set password',
        loading: isSubmitting,
        // onPress: () => nav.navigate('PasswordSet'),
        onPress: ()=>{
          let isValidated= false;
          console.log({values})
          if(String(values.confirmPassword) != String(values.password)){
            errors.set("confirmPassword", "Passwords didn't match")
          }else{
            isValidated= true
            errors.delete("confirmPassword");
          }
          isValidated && submit();
        } 
      }}>
      <View>
        <Spacer gap={20}>
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
            onChangeText={ (val)=>{
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
            placeholder="Enter your password"
          />
        </Spacer>
      </View>
    </DefaultScreen>
  );
}
