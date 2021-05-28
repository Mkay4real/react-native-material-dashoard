import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import DefaultScreen from '../../../shared/components/DefaultScreen';
import HStack from '../../../shared/components/HStack';
import userInfoStore from '../../../shared/stores/userInfo';
import { resetPassword } from '../../onboarding/services/api';
import { useForm } from '../../../form';

const config = { required: true, initialValue: '' };

export default function ResetOtp() {
  const nav = useNavigation();
  const [loading, setIsLoading] = React.useState(false);

  const { set, corporateId, username } = userInfoStore(
    ({ corporateId, username, setDetails, }) => {
      return {
        corporateId,
        username,
        set: setDetails,
      };
    },
  );

  const { values, submit, data, error, submitted, isSubmitting, onChange } = useForm({
    schema: {
      code: config,
    },
    onSubmit({ code }) {
      set({ password: code as string });
      //TODO: attempt to login with the temporary password
      // return resetPassword(corporateId, username)
      return Promise.resolve();
    },
  });

  const resendPassword = async () => {
    setIsLoading(true);
    resetPassword(corporateId as string, username as string)
      .then(response => setIsLoading(false))
      .catch(err => { console.log(err); setIsLoading(false); })

  }

  React.useEffect(() => {
    if (submitted) {
      nav.navigate('SetPassword')
    }
  }, [nav, submitted]);

  return (
    <DefaultScreen
      style={styles.screen}
      title="Forgot Password"
      subtitle="We've sent a temporary password via SMS or email to you, please enter it here"
      action={{
        label: 'Next',
        loading: loading || isSubmitting,
        // onPress: () => nav.navigate('SetPassword'),
        onPress: submit,
      }}>
      <View>
        <TextInput
          mode="outlined"
          label="Enter code"
          placeholder="Enter code"
          value={values.code as string}
          onChangeText={onChange.bind(null, 'code')}
        />
        <HStack alignItems="center" justifyContent="flex-end">
          <Text>Didn't get a temporary password?</Text>
          <Button onPress={() => resendPassword()} mode="text">Re-send password</Button>
        </HStack>
      </View>
    </DefaultScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'space-between',
  },
});
