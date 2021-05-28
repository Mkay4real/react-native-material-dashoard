import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {
  dashboardOptions,
  drawerOptions,
} from '../../../shared/utils/headerOptions';
import Details from './screens/Details';
import Notifications from './screens/Notifications';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator screenOptions={dashboardOptions}>
      <Stack.Screen
        name="Notifications"
        options={drawerOptions}
        component={Notifications}
      />

      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}
