import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {options} from '../../shared/utils/headerOptions';
import Intro from './screens/Intro';
import PasswordSet from './screens/PasswordSet';
import ResetOtp from './screens/ResetOtp';
import RequestOtp from './screens/RequestOtp';
import SetPassword from './screens/SetPassword';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Intro" component={Intro} options={options} />
      <Stack.Screen name="RequestOtp" component={RequestOtp} options={options} />
      <Stack.Screen name="ResetOtp" component={ResetOtp} options={options} />
      <Stack.Screen
        options={options}
        name="SetPassword"
        component={SetPassword}
      />
      <Stack.Screen
        options={options}
        name="PasswordSet"
        component={PasswordSet}
      />
    </Stack.Navigator>
  );
};

export default App;
