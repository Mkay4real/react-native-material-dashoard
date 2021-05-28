/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Linking } from 'react-native';
import 'react-native-gesture-handler';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import AppDrawer from './AppDrawer';
import AccountCreation from './modules/account-creation/App';
import CorporateProfiling from './modules/corporate-profiling/App';
import ForgotPassword from './modules/forgot-password/App';
import NonSMECorporateProfiling from './modules/non-sme-corporate_profiling/App';
import Onboarding from './modules/onboarding/App';
import { getToken } from './shared/services/token';
import appAuthStore from './shared/stores/appAuth';
import { mainOptions } from './shared/utils/headerOptions';
import NotFound from './modules/onboarding/screens/NotFound'
import theme from './shared/utils/theme';
import Toast from 'react-native-simple-toast';
import { _navigator } from './shared/utils/NavigationService';
import linking from './linking';

// React Hooks: Refs
// const navigationRef: React.RefObject<NavigationContainerRef> = React.useRef(null);

const useMount = (func: Function, cleanup?: Function | any) =>
  useEffect(() => {
    func();
    return cleanup;
  }, []);

const useInitialUrl = () => {
  const [url, setUrl] = React.useState('');
  const [processing, setProcessing] = React.useState(true);

  useMount(() => {
    const getUrlAsync = async () => {
      //Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL();

      setTimeout(() => {
        setUrl(initialUrl as string);
        setProcessing(false);
      }, 1000);
    };
    getUrlAsync();
  });

  return { url, processing };
}

const Stack = createStackNavigator();

const App = () => {
  const setToken = appAuthStore(({ setToken }) => setToken);
  const { url: initialUrl, processing } = useInitialUrl();
  console.log({ processing, initialUrl });

  const handleOpenUrl = ({ url, ...props }: any) => {
    console.log("Opening url: " + url)

  }
  useMount(() => {
    Linking.addEventListener('url', handleOpenUrl);
  }, Linking.removeListener('url', handleOpenUrl));

  useEffect(() => {
    (async () => {
      console.log('getting token');

      const token = await getToken();
      if (token) {
        console.log(token);
        Toast.show("Authentication was successful");
      }

      setToken(token);
    })();
  }, [setToken]);

  return (
    <SafeAreaView style={style.fill}>
      <PaperProvider theme={theme}>
        <NavigationContainer ref={_navigator} linking={linking} fallback={<Text>Loading ...</Text>}>
          <Stack.Navigator
            // initialRouteName="Dashboard"
            initialRouteName="Onboarding"
            screenOptions={mainOptions}>
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="AccountCreation" component={AccountCreation} />
            <Stack.Screen
              name="CorporateProfiling"
              component={CorporateProfiling}
            />
            <Stack.Screen
              name="NonSMECorporateProfiling"
              component={NonSMECorporateProfiling}
            />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="Dashboard" component={AppDrawer} />
            <Stack.Screen name="Main" component={AppDrawer} />
            <Stack.Screen name="NotFound" component={NotFound} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  fill: {
    flex: 1,
  },
});

export default App;
