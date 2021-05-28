import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {TextInput} from '../../../exports';
import DefaultScreen from '../../../shared/components/DefaultScreen';

import {useForm} from '../../../form';
import { verifyOtp } from '../../../shared/services/api';
import corporateProfilingStore from '../../../shared/stores/corporateProfiling';

export default function Otp() {
  const nav = useNavigation();
  const {params} = useRoute();
  const requestReferenceId = corporateProfilingStore(({requestReferenceId}) => requestReferenceId);

  const {errors, error, submit, submitted, isSubmitting, onChange} = useForm({
    schema: {
      otp: {
        required: true,
        initialValue: '333666',
      },
    },
    onSubmit({otp}) {
      return  verifyOtp(otp as string,requestReferenceId)
      // return Promise.resolve();
    },
  });

  useEffect(() => {
    if (submitted) {
      error && console.log('otp error', error, (error as any)?.response);
      nav.navigate('BusinessDetails');
    }
  }, [nav, submitted]);

  return (
    <DefaultScreen
      decorate={true}
      subtitle={(params as any)?.mobileNumber || "09063****89"}
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
