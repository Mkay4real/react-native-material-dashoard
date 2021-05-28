import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Colors, Headline, ProgressBar, Subheading} from 'react-native-paper';
import {TextInput} from '../../../exports';
import ScrollableDefaultScreen from '../../../shared/components/ScrollableDefaultScreen';
import Spacer from '../../../shared/components/Spacer';

import {useForm} from '../../../form';

const config = {required: true};

export default function AdminDetails() {
  const {params} = useRoute();
  const nav = useNavigation();

  const {errors, submit, submitted, isSubmitting, handlers} = useForm({
    schema: {
      username: config,
      firstName: config,
      lastName: config,
      email: config,
      phoneNumber: config,
    },
    onSubmit() {
      return Promise.resolve();
    },
  });

  useEffect(() => {
    if (submitted) {
      nav.navigate('OnboardingDone');
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
        <Spacer>
          <Headline>
            Admin {(params as any)?.type === 'maker' ? 'maker' : 'checker'}{' '}
            details
          </Headline>
          <ProgressBar progress={0.7} />
        </Spacer>
      </View>
      <View>
        <Spacer gap={25}>
          <Subheading style={{color: Colors.grey600}}>
            Now we need details about the admin
          </Subheading>
          <TextInput
            label="Preferred username"
            error={errors.has('username')}
            errorMessage={errors.get('username')}
            onChangeText={handlers.username.onChange}
            placeholder="Enter your preferred username"
          />

          <TextInput
            label="First name"
            error={errors.has('firstName')}
            placeholder="Enter your first name"
            errorMessage={errors.get('firstName')}
            onChangeText={handlers.firstName.onChange}
          />

          <TextInput
            label="Last name"
            error={errors.has('lastName')}
            placeholder="Enter your last name"
            errorMessage={errors.get('lastName')}
            onChangeText={handlers.lastName.onChange}
          />

          <TextInput
            label="Email"
            keyboardType="email-address"
            error={errors.has('email')}
            placeholder="Enter your email"
            errorMessage={errors.get('email')}
            onChangeText={handlers.email.onChange}
          />

          <TextInput
            label="Phone number"
            keyboardType="phone-pad"
            placeholder="Enter your phone number"
            error={errors.has('phoneNumber')}
            errorMessage={errors.get('phoneNumber')}
            onChangeText={handlers.phoneNumber.onChange}
          />
        </Spacer>
      </View>
    </ScrollableDefaultScreen>
  );
}
