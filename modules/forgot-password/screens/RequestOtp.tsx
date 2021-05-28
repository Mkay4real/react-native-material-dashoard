import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import DefaultScreen from '../../../shared/components/DefaultScreen';
import HStack from '../../../shared/components/HStack';
import userInfoStore from '../../../shared/stores/userInfo';
import { useForm } from '../../../form';
import { resetPassword } from '../../onboarding/services/api';
import { notify } from '../../../shared/utils/utils';

const config = { required: true, initialValue: '' };

export default function RequestOtp() {
  const nav = useNavigation();

  const set = userInfoStore(({ setDetails }) => setDetails);

  const { values, submit, data, error, submitted, isSubmitting, onChange } = useForm({
    schema: {
      corporateId: config,
      username: config,
    },
    onSubmit({ corporateId, username }) {
      set({ corporateId, username });
      return resetPassword(corporateId, username)
    },
  });

  React.useEffect(() => {
    if (submitted) {
      if (data) {
        // set({ correlationId: data.correlationId });
        notify({ message: data?.message })
        data.code=="00" &&
        nav.navigate('ResetOtp');
      } else {
        notify({ message: (error as any)?.response?.data?.error })
        console.log('response error', (error as any)?.response?.data);
      }
    }
  }, [nav, submitted]);

  return (
    <DefaultScreen
      style={styles.screen}
      title="Forgot Password"
      subtitle="Please enter your corporate ID and  username below "
      action={{
        label: 'Next',
        loading: isSubmitting,
        // onPress: () => nav.navigate('ResetOtp'),
        onPress: submit,
      }}>
      <View>
        <TextInput
          mode="outlined"
          label="Enter Corporate ID"
          placeholder="Enter Corporate ID"
          value={values.corporateId as string | undefined}
          onChangeText={onChange.bind(null, 'corporateId')}
        />
        <TextInput
          mode="outlined"
          label="Enter username"
          placeholder="Enter username"
          value={values.username as string | undefined}
          onChangeText={onChange.bind(null, 'username')}
        />
        {/* <HStack alignItems="center" justifyContent="flex-end">
          <Text>Didn't get a code?</Text>
          <Button mode="text">Re-send code</Button>
        </HStack> */}
      </View>
    </DefaultScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'space-between',
  },
});
