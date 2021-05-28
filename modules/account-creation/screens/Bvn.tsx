import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useCallback} from 'react';
import {TextInput} from '../../../exports';
import {useForm} from '../../../form';
import DefaultScreen from '../../../shared/components/DefaultScreen';
import {initiateFlow, requestOtp} from '../services/api';
import accountCreationStore from '../../../shared/stores/accountCreation';

export default function Bvn() {
  const bvn = '55555555555';

  const nav = useNavigation();

  const set = accountCreationStore(({setDetails}) => setDetails);

  const {
    data,
    error,
    submit,
    values,
    errors,
    onChange,
    submitted,
    isSubmitting,
  } = useForm({
    once: false,
    schema: {
      bvn: {
        required: true,
        initialValue: bvn,
      },
    },
    onSubmit({bvn}) {
      console.log('on submit');
      return initiateFlow(bvn as string);
    },
  });

  console.log('here', data, error);

  const makeOtpRequest = useCallback(async () => {
    const otpResponse = await requestOtp({requestFlowReference: data.requestFlowReference});
    if(otpResponse){
      set({requestFlowReference: data.requestFlowReference});
      nav.navigate('Otp', {mobileNumber: data.mobileNumber});
    }
    
  }, [nav, data]);

  useEffect(() => {
    set({bvn});
  }, []);

  useEffect(() => {
    if (submitted) {
      set({bvn: values.bvn});
      data &&
      makeOtpRequest();
    }
  }, [submitted, makeOtpRequest]);

  return (
    <DefaultScreen
      decorate={true}
      title="Validate your BVN"
      action={{
        label: 'Next',
        onPress: submit,
        loading: isSubmitting,
        // onPress: () => nav.navigate('Otp'),
      }}>
      <TextInput
        label="BVN"
        value={values.bvn}
        error={errors.has('bvn')}
        placeholder="Enter your BVN"
        maxLength={11}
        errorMessage={errors.get('bvn')}
        onChangeText={onChange.bind(null, 'bvn')}
      />
    </DefaultScreen>
  );
}
