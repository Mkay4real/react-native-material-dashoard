import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {TextInput} from '../../../exports';
import DefaultScreen from '../../../shared/components/DefaultScreen';

import {useForm} from '../../../form';

export default function AccountValidation() {
  const nav = useNavigation();

  const {errors, submit, submitted, isSubmitting, onChange} = useForm({
    schema: {
      accountNumber: {
        required: true,
      },
    },
    onSubmit() {
      return Promise.resolve();
    },
  });

  useEffect(() => {
    if (submitted) {
      nav.navigate('Otp');
    }
  }, [nav, submitted]);

  return (
    <DefaultScreen
      decorate={true}
      title="Account Validation"
      subtitle="Please provide your parallex account number"
      action={{
        label: 'Next',
        onPress: submit,
        loading: isSubmitting,
      }}>
      <TextInput
        label="Account number"
        placeholder="Enter account number"
        error={errors.has('accountNumber')}
        errorMessage={errors.get('accountNumber')}
        onChangeText={onChange.bind(null, 'accountNumber')}
      />
    </DefaultScreen>
  );
}
