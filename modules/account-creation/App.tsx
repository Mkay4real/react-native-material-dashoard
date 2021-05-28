import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useTheme} from 'react-native-paper';
import {mainOptions} from '../../shared/utils/headerOptions';
import AccountNumber from './screens/AccountNumber';
import BusinessDetails from './screens/BusinessDetails';
import BusinessType from './screens/BusinessType';
import Bvn from './screens/Bvn';
import DirectorsProgress from './screens/DirectorsProgress';
import Docs from './screens/Docs';
import MailOtp from './screens/MailOtp';
import Main from './screens/Main';
import OnboardingDone from './screens/OnboardingDone';
import OnboardingProgress from './screens/OnboardingProgress';
import Otp from './screens/Otp';
import Password from './screens/Password';
import PersonalDetails from './screens/PersonalDetails';
import RCNumber from './screens/RCNumber';
import Shareholders from './screens/Shareholders';

const Stack = createStackNavigator();

const App = () => {
  const {
    colors: {primaryDark},
  } = useTheme();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{
          headerTintColor: 'white',
          headerStyle: {backgroundColor: primaryDark},
        }}
      />
      <Stack.Screen name="Bvn" component={Bvn} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="BusinessType" component={BusinessType} />
      <Stack.Screen name="RCNumber" component={RCNumber} />
      <Stack.Screen name="MailOtp" component={MailOtp} />
      <Stack.Screen name="Password" component={Password} />
      <Stack.Screen name="BusinessDetails" component={BusinessDetails} />
      <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
      <Stack.Screen name="UploadDocs" component={Docs} />
      <Stack.Screen name="Shareholders" component={Shareholders} />
      <Stack.Screen name="OnboardingProgress" component={OnboardingProgress} />
      <Stack.Screen name="DirectorsProgress" component={DirectorsProgress} />
      <Stack.Screen name="AccountNumber" component={AccountNumber} />
      <Stack.Screen
        options={mainOptions}
        name="OnboardingDone"
        component={OnboardingDone}
      />
    </Stack.Navigator>
  );
};

export default App;
