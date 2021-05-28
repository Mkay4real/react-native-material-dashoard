import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {
  dashboardOptions,
  drawerOptions,
} from '../../../shared/utils/headerOptions';
import Details from './screens/Details';
import Transactions from './screens/Transactions';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator screenOptions={dashboardOptions}>
      <Stack.Screen
        name="Transactions"
        options={drawerOptions}
        component={Transactions}
      />

      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}
