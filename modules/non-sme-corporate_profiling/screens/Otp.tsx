import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {TextInput} from '../../../exports';
import DefaultScreen from '../../../shared/components/DefaultScreen';

import {useForm} from '../../../form';

export default function Otp() {
  const nav = useNavigation();

  const {errors, submit, submitted, isSubmitting, onChange} = useForm({
    schema: {
      otp: {
        required: true,
      },
    },
    onSubmit() {
      return Promise.resolve();
    },
  });

  useEffect(() => {
    if (submitted) {
      nav.navigate('BusinessDetails');
    }
  }, [nav, submitted]);

  return (
    <DefaultScreen
      decorate={true}
      subtitle="09063****89"
      title="Enter code sent to you phone"
      action={{
        label: 'Next',
        onPress: submit,
        loading: isSubmitting,
      }}>
      <TextInput
        label="OTP code"
        error={errors.has('otp')}
        placeholder="Enter OTP code"
        errorMessage={errors.get('otp')}
        onChangeText={onChange.bind(null, 'otp')}
      />
    </DefaultScreen>
  );
}
