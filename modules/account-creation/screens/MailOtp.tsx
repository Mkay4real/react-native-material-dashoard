import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { TextInput } from '../../../exports';
import DefaultScreen from '../../../shared/components/DefaultScreen';
import { useForm } from '../../../form';
import accountCreationStore from '../../../shared/stores/accountCreation';

import { verifyOtp } from '../services/api';

export default function MailOtp() {
  const nav = useNavigation();

  const {email, requestFlowReference} = accountCreationStore(({ email,requestFlowReference }) => {
    return {
      email,
      requestFlowReference
    }
  });

  const { errors, submit, submitted, isSubmitting, onChange } = useForm({
    schema: {
      otp: {
        required: true,
      },
    },
    onSubmit({ otp }) {
      return verifyOtp(otp as string, requestFlowReference);
    },
  });

  console.log(email);

  useEffect(() => {
    if (submitted) {
      nav.navigate('BusinessDetails');
    }
  }, [nav, submitted]);

  return (
    <DefaultScreen
      decorate={true}
      subtitle={email}
      title="Enter 6 digit code sent to your business mail"
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
