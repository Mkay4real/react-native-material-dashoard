import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {mainOptions, options} from '../../shared/utils/headerOptions';
import AccountDetails from './screens/BusinessDetails';
import AccountValidation from './screens/AccountValidation';
import AdminDetails from './screens/AdminDetails';
import BusinessDetails from './screens/BusinessDetails';
import OnboardingDone from './screens/OnboardingDone';
import Otp from './screens/Otp';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="AccountValidation" component={AccountValidation} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="BusinessDetails" component={BusinessDetails} />
      <Stack.Screen name="AccountDetails" component={AccountDetails} />
      <Stack.Screen name="AdminDetails" component={AdminDetails} />
      <Stack.Screen
        options={mainOptions}
        name="OnboardingDone"
        component={OnboardingDone}
      />
    </Stack.Navigator>
  );
};

export default App;
