import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {
  dashboardOptions,
  drawerOptions,
} from '../../../shared/utils/headerOptions';
import Employees from './screens/Employees';
import Payments from './screens/Payments';
import Salaries from './screens/Salaries';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator screenOptions={dashboardOptions}>
      <Stack.Screen
        name="Payments"
        component={Payments}
        options={drawerOptions}
      />
      <Stack.Screen
        name="Salaries"
        component={Salaries}
        options={{title: 'Pay salaries'}}
      />
      <Stack.Screen
        name="Employees"
        component={Employees}
        options={{title: 'All employees'}}
      />
    </Stack.Navigator>
  );
}
