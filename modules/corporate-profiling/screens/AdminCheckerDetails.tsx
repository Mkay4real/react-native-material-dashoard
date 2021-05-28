import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Colors, Headline, ProgressBar, Subheading } from 'react-native-paper';
import { TextInput } from '../../../exports';
import ScrollableDefaultScreen from '../../../shared/components/ScrollableDefaultScreen';
import Spacer from '../../../shared/components/Spacer';

import { useForm } from '../../../form';
import corporateProfilingStore from '../../../shared/stores/corporateProfiling';
import { onboardCorporate } from '../services/api';
import { getAccountDetails } from '../../../shared/services/api';

const config = {
  required: true,
  validate: (val: any) => {
    if (String(val).length < 3)
      return ("Please enter valid input");
  }
};
const prefil = (val: string) => ({ ...config, initialValue: val });

export default function AdminCheckerDetails() {
  const nav = useNavigation();

  const { setDetails: set, isSME, accountNumber, accountNumberDetails, adminMakerDetails, adminCheckerDetails, businessDetails, corporateAccountDetails } =
    corporateProfilingStore(({ setDetails,
      businessDetails,
      isSME,
      accountNumber,
      accountNumberDetails,
      adminMakerDetails,
      adminCheckerDetails,
      corporateAccountDetails }) =>
      ({ setDetails, isSME, businessDetails, accountNumber, accountNumberDetails, adminMakerDetails, adminCheckerDetails, corporateAccountDetails }));


  const [loading, setIsLoading] = useState(false);

  const { errors, values, submit, submitted, isSubmitting, handlers } = useForm({
    schema: {
      username: prefil("my_checker"),
      firstName: prefil("MyFirstName"),
      lastName: prefil("CheckerLastName"),
      email: prefil("checker_name@system.com"),
      phoneNumber: prefil("09011223344"),
    },
    onSubmit({ username, phoneNumber, email, lastName, firstName }) {
      console.log("maker checker", values)
      set({ adminCheckerDetails: { username, firstName, lastName, email, phone: phoneNumber } })
      // createProfile();
      return Promise.resolve();
    },
  });


  const createProfile = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const payload = { setDetails: set, accountNumber, accountNumberDetails, adminMakerDetails, adminCheckerDetails, businessDetails, corporateAccountDetails }
      console.log("creation payload", payload)

      // onboardCorporate(false, payload).then(res => console.log(res));
      const res = await onboardCorporate(false, payload);
      res && nav.navigate('OnboardingDone');
      setIsLoading(false);
    } catch (error) {
      console.log("creation error", error)
      setIsLoading(false);
    }

  }, [submitted, nav]);

  useEffect(() => {
    if (submitted) {
      createProfile();
      // nav.navigate('OnboardingDone');
    }
  }, [nav, submitted]);

  return (
    <ScrollableDefaultScreen
      decorate={true}
      action={{
        label: 'Next',
        onPress: submit,
        // onPress: createProfile,
        loading: isSubmitting || loading,
      }}>
      <View>
        <Spacer>
          <Headline>Admin Checker details</Headline>
          <ProgressBar progress={0.7} />
        </Spacer>
      </View>
      <View>
        <Spacer gap={20}>
          <Subheading style={{ color: Colors.grey600 }}>
            Now we need details about the admin
          </Subheading>
          <TextInput
            label="Preferred username"
            value={values.username}
            error={errors.has('username')}
            errorMessage={errors.get('username')}
            onChangeText={handlers.username.onChange}
            placeholder="Enter your preferred username"
          />

          <TextInput
            label="First name"
            value={values.firstName}
            error={errors.has('firstName')}
            placeholder="Enter your first name"
            errorMessage={errors.get('firstName')}
            onChangeText={handlers.firstName.onChange}
          />

          <TextInput
            label="Last name"
            value={values.lastName}
            error={errors.has('lastName')}
            placeholder="Enter your last name"
            errorMessage={errors.get('lastName')}
            onChangeText={handlers.lastName.onChange}
          />

          <TextInput
            label="Email"
            value={values.email}
            keyboardType="email-address"
            error={errors.has('email')}
            placeholder="Enter your email"
            errorMessage={errors.get('email')}
            onChangeText={handlers.email.onChange}
          />

          <TextInput
            label="Phone number"
            value={values.phoneNumber}
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
