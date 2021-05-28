import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from '../../../exports';
import DefaultScreen from '../../../shared/components/DefaultScreen';
import {useForm} from '../../../form';

import {verifyOtp} from '../services/api';
import accountCreationStore from '../../../shared/stores/accountCreation';

export default function Otp() {
  const nav = useNavigation();
  const {params} = useRoute();
  const {set, requestFlowReference } = accountCreationStore(({requestFlowReference, setDetails}) => ({set: setDetails, requestFlowReference}));

  const {
    error,
    errors,
    values,
    data,
    submit,
    submitted,
    isSubmitting,
    onChange,
  } = useForm({
    schema: {
      otp: {
        required: true,
        initialValue: '333666',
      },
    },
    onSubmit({otp}) {
      return verifyOtp(otp as string, requestFlowReference);
      // return verifyOtp2({requestFlowReference: requestFlowReference || 'vYLf1612821070588',valueToVerify: otp});
    },
  });

  useEffect(() => {
    if (submitted) {
      set({phoneNumber: (params as any)?.mobileNumber})
      error && console.log('otp error', error, (error as any)?.response);
      nav.navigate('BusinessType');
    }
  }, [nav, submitted]);

  return (
    <DefaultScreen
      decorate={true}
      title="Enter code sent to your phone"
      subtitle={(params as any)?.mobileNumber}
      action={{
        label: 'Next',
        onPress: submit,
        loading: isSubmitting,
        // onPress: () => nav.navigate('BusinessType'),
      }}>
      <TextInput
        label="OTP code"
        style={styles.otp}
        value={values.otp}
        error={errors.has('otp')}
        placeholder="Enter OTP code"
        maxLength={7}
        errorMessage={errors.get('otp')}
        onChangeText={onChange.bind(null, 'otp')}
      />
    </DefaultScreen>
  );
}

const styles = StyleSheet.create({
  otp: {
    textAlign: 'center',
  },
});
