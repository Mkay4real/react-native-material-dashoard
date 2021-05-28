import { useNavigation } from '@react-navigation/native';
import { values } from 'fp-ts/lib/Map';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Headline } from 'react-native-paper';
import { TextInput } from '../../../exports';
import { useForm } from '../../../form';
import ScrollableDefaultScreen from '../../../shared/components/ScrollableDefaultScreen';
import Spacer from '../../../shared/components/Spacer';
import accountCreationStore from '../../../shared/stores/accountCreation';

import { requestOtp } from '../services/api';

const config = { required: true };

export default function RCNumber() {
  const nav = useNavigation();

  const {set, requestFlowReference} = accountCreationStore(({ setDetails,requestFlowReference }) => {
    return {
      set: setDetails,
      requestFlowReference
    }
  });

  const { errors, values, submit, submitted, isSubmitting, handlers } = useForm({
    schema: {
      businessName: config,
      phoneNumber: config,
      email: config,
    },
    onSubmit({ email }) {
      return requestOtp({
        valueToVerify: email,
        requestFlowReference: requestFlowReference as string,
      });
    },
  });

  useEffect(() => {
    if (submitted) {
      set({
        email: values.email as string,
        businessName: values.businessName as string,
      });

      nav.navigate('MailOtp');
    }
  }, [nav, submitted]);

  return (
    <ScrollableDefaultScreen
      decorate={true}
      action={{
        label: 'Next',
        onPress: submit,
        loading: isSubmitting,
      }}>
      <View>
        <Headline>Validate RC number</Headline>
        {/* <Subheading style={{color: Colors.grey600}}>
          Kindly set your password
        </Subheading> */}
      </View>
      <View>
        <Spacer gap={25}>
          <TextInput
            label="Business name"
            placeholder="Enter business name"
            error={errors.has('businessName')}
            errorMessage={errors.get('businessName')}
            onChangeText={handlers.businessName.onChange}
          />

          <TextInput
            label="Phone number"
            placeholder="Enter phone number"
            error={errors.has('phoneNumber')}
            errorMessage={errors.get('phoneNumber')}
            onChangeText={handlers.phoneNumber.onChange}
          />

          <TextInput
            label="Email"
            placeholder="Enter email"
            error={errors.has('email')}
            errorMessage={errors.get('email')}
            onChangeText={handlers.email.onChange}
          />
        </Spacer>
      </View>
    </ScrollableDefaultScreen>
  );
}
