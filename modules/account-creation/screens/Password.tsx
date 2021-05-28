import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Headline, Subheading, TextInput} from 'react-native-paper';
import ScrollableDefaultScreen from '../../../shared/components/ScrollableDefaultScreen';
import Spacer from '../../../shared/components/Spacer';
import {useForm} from '../../../form';
import DefaultScreen from '../../../shared/components/DefaultScreen';

type Passwords = {
  password: string;
  confirmPassword: string;
};

const passwords = {required: true};

export default function Password() {
  const nav = useNavigation();

  const {submit, submitted, isSubmitting} = useForm<Passwords>({
    schema: {
      password: passwords,
      confirmPassword: passwords,
    },
    validate({password, confirmPassword}) {
      const errors = {} as Passwords;

      if (!password) {
        errors.password = 'Password is required';
      }

      if (!confirmPassword) {
        errors.password = 'Confirm password is required';
      }

      if (confirmPassword !== password) {
        errors.confirmPassword = 'Confirm password does not match password';
      }

      return errors;
    },
    onSubmit() {
      return Promise.reject();
    },
  });

  useEffect(() => {
    if (submitted) {
      nav.navigate('RCNumber');
    }
  }, [nav, submitted]);

  return (
    <DefaultScreen
      title="Johnson Olabisi"
      subtitle="Kindly set your password"
      action={{
        onPress: submit,
        label: 'proceed',
        loading: isSubmitting,
      }}>
      <Spacer gap={20}>
        <TextInput
          mode="outlined"
          label="Password"
          placeholder="Enter your password"
        />
        <TextInput
          mode="outlined"
          label="Confirm password"
          placeholder="Enter your password"
        />
      </Spacer>
    </DefaultScreen>
  );
}
