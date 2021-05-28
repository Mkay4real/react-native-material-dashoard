import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Caption, Headline} from 'react-native-paper';
import {PasswordInput, TextInput} from '../../exports';
import ScrollableDefaultScreen from '../../shared/components/ScrollableDefaultScreen';
import Spacer from '../../shared/components/Spacer';

import {useForm} from '../../form';
import {useNavigation} from '@react-navigation/native';

type Form = {
  username: string;
  password: string;
  confirmPassword: string;
};

const config = {required: true};

export default function Credentials() {
  const nav = useNavigation();

  const {values, errors, submit, submitted, isSubmitting, handlers} = useForm<
    Form
  >({
    schema: {
      username: config,
      password: config,
      confirmPassword: config,
    },
    validate({password, confirmPassword}) {
      let errors = {} as Form;

      if (confirmPassword !== password) {
        const error = "Passwords don't match";
        errors.password = error;
        errors.confirmPassword = error;
      }

      return errors;
    },
    onSubmit() {
      return Promise.resolve();
    },
  });

  useEffect(() => {
    if (submitted) {
      nav.navigate('AddStaff');
    }
  }, [submitted]);

  return (
    <ScrollableDefaultScreen
      action={{
        onPress: submit,
        label: 'Proceed',
        loading: isSubmitting,
      }}>
      <Spacer gap={30}>
        <View>
          <Headline>Setup your login credentials</Headline>
          <Caption>Please provide your username and password</Caption>
        </View>

        <View>
          <Spacer gap={20}>
            <TextInput
              label="Username"
              value={values.username}
              error={errors.has('username')}
              placeholder="Enter your username"
              errorMessage={errors.get('username')}
              onChangeText={handlers.username.onChange}
            />

            <PasswordInput
              label="Password"
              value={values.password}
              error={errors.has('password')}
              placeholder="Enter your password"
              errorMessage={errors.get('password')}
              onChangeText={handlers.password.onChange}
            />

            <PasswordInput
              label="Confirm password"
              value={values.confirmPassword}
              placeholder="Enter your password"
              error={errors.has('confirmPassword')}
              errorMessage={errors.get('confirmPassword')}
              onChangeText={handlers.confirmPassword.onChange}
            />
          </Spacer>
        </View>
      </Spacer>
    </ScrollableDefaultScreen>
  );
}
