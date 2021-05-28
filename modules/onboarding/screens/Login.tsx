import { useNavigation } from '@react-navigation/native';
import React, { createRef, useCallback, useEffect, useState } from 'react';
import { StyleSheet, TextInput as RNTextInput, View, Alert } from 'react-native';
import { Colors, Headline, Subheading, useTheme } from 'react-native-paper';
import FingerPrint from '../../../assets/finger-print.svg';
import Biometrics from 'react-native-biometrics';
import { Button, PasswordInput, TextInput } from '../../../exports';
import { useForm } from '../../../form';
import HStack from '../../../shared/components/HStack';
import Screen from '../../../shared/components/Screen';
import Spacer from '../../../shared/components/Spacer';
import VStack from '../../../shared/components/VStack';
import Header from '../components/Header';
import { clientLogin } from '../services/api';
import { saveCredentials, getCredentials } from '../../../shared/utils/storage';
import { BiometricsType } from '../components/BiometricType';
import userInfoStore from '../../../shared/stores/userInfo';

export default function Login() {
  const nav = useNavigation();
  const passwordRef = createRef<RNTextInput>();

  const set = userInfoStore(({ setDetails }) => setDetails);

  const {
    colors: { primary },
  } = useTheme();

  const [state, setState] = useState({ data: {} });
  const [savedPassword, setSavedPassword] = useState('');
  const [loading, setIsLoading] = useState(false);

  const {
    values,
    error,
    data,
    isSubmitting,
    submit,
    errors,
    submitted,
    handlers,
    clearError,
  } = useForm({
    schema: {
      username: {
        required: true,
        initialValue: '',
        // initialValue: (state as any)?.data.username || '',
      },
      corporate: {
        required: true,
        initialValue: '',
        // initialValue: (state as any)?.data.username || '',
      },
      password: {
        required: true,
        initialValue: '',
        // initialValue: (state as any)?.data.password || '',
      },
    },
    onSubmit({ username, corporate, password }) {
      return clientLogin(username, corporate, password);
    },
  });

  const focusPassword = useCallback(() => {
    passwordRef.current?.focus();
  }, [passwordRef]);

  useEffect(() => {

    console.log(values, errors, error);
    if (submitted && data) {
      nav.navigate('Dashboard');
    }
  }, [nav, submitted]);

  useEffect(() => {
    (async () => {
      await init();
    })();
  }, []);

  const init = async () => {
    Biometrics.isSensorAvailable()
      .then(async (biometryType) => {

        if (biometryType === Biometrics.TouchID) {
          setState({
            data: {
              type: 1,
              biometryType: biometryType,
            }
          })
        } else if (biometryType === Biometrics.FaceID) {
          setState({
            data: {
              type: 2,
              biometryType
            }
          })
        } else {
          setState({
            data: {
              type: 0,
              biometryType
            }
          })
        }
        await LoadBiometricsItems();
        console.log('bio type', state.data, biometryType)
      })
  }

  const LoadBiometricsItems = async () => {
    try {
      console.log('Client login before loadBiometrics', state)

      const username = await getCredentials("client_username");
      const corporate = await getCredentials("client_corporate");
      const password = await getCredentials("client_password");
      const isSaved = await getCredentials("save_client_id");

      if (isSaved === 'true') {
        if (username != null && corporate != null && password != null) {
          console.log("Username is", username)
          console.log("Corporate code is", corporate)
          console.log("Password", password)

          handlers.username.onChange(username);
          handlers.corporate.onChange(corporate);
          // handlers.password.onChange(password);

          setState(prev => ({
            data: {
              ...prev.data,
              username: username,
              password: password,
              corporate: corporate,
              saveId: true,
              type: 0,
              showBiometric: true
            }
          }));
        }
      } else {
        setState(prev => ({
          data: {
            ...prev.data,
            saveId: false
          }
        }));
      }
      setTimeout(() => {

        console.log('State after loadBiometrics:', state.data)
      }, 1000);
    } catch (error) {
      console.log(error)
    }
  }

  const _authenticate = () => {
    Biometrics.simplePrompt('Confirm biometrics')
      .then(() => {
        _biometricLogin()
      })
      .catch(() => {
        // alert("Fingerprint authentication failed");
        //this.props.navigation.goBack();
      })
  }

  const _biometricLogin = async () => {
    let { username, corporate, password } = (state as any).data;

    try {
      if (!password)
        return Alert.alert("Alert", 'Please Enter your username or password');

      handlers.password.onChange(password);
      setIsLoading(true);
      setTimeout(() => {
        handlers.password.onChange('*********');
      }, 1000);
      // submit();

      const response = await clientLogin(username, corporate, password);
      console.log("returned val", response)
      if (response) {
        nav.navigate('Dashboard')
      }
      handlers.password.onChange('');
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <Screen style={styles.screen}>
      <Header />
      <VStack flex={2} margin={20} justifyContent="space-evenly">
        <View>
          <Headline>Welcome back</Headline>
          <Subheading style={{ color: Colors.grey600 }}>
            Log in to your parallex account with your details
          </Subheading>
        </View>
        <View style={{ flex: 1 }}>
          <Spacer gap={20}>
            <TextInput
              label="Username"
              returnKeyType="next"
              value={values.username}
              error={errors.has('username')}
              // onSubmitEditing={focusPassword}
              errorMessage={errors.get('username')}
              onChangeText={handlers.username.onChange}
            />

            <TextInput
              label="Corporate code"
              returnKeyType="next"
              value={values.corporate}
              error={errors.has('corporate')}
              onSubmitEditing={focusPassword}
              errorMessage={errors.get('corporate')}
              onChangeText={handlers.corporate.onChange}
            />

            <PasswordInput
              label="Password"
              ref={passwordRef}
              returnKeyType="go"
              value={values.password}
              onSubmitEditing={submit}
              error={errors.has('password')}
              errorMessage={errors.get('password')}
              onChangeText={handlers.password.onChange}
            />

            <HStack alignItems="center" justifyContent="space-between">
              <Button style={{ flex: 1 }} onPress={submit} loading={isSubmitting || loading}>
                {isSubmitting || loading ? 'Loggin in' : 'Login'}
              </Button>
              <BiometricsType
                type={(state as any)?.data.biometryType}
                // type={Biometrics.FaceID}
                action={_authenticate}
                color={primary}
              />

            </HStack>
          </Spacer>
        </View>
      </VStack>
      <Button
        style={styles.forgotPassword}
        labelStyle={{ color: Colors.black }}
        onPress={() => nav.navigate('ForgotPassword')}>
        Forgot Password?
      </Button>
      {/* <Snackbar onDismiss={clearError} visible={Boolean(error)}>
        {(error as Error)?.message}
      </Snackbar> */}
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 0,
    justifyContent: 'space-between',
  },
  forgotPassword: {
    marginTop: 20,
    borderRadius: 0,
    paddingVertical: 12,
    backgroundColor: 'rgba(9, 30, 66, 0.04)',
  },
});
