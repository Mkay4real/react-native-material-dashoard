import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {
  dashboardOptions,
  drawerOptions,
} from '../../../shared/utils/headerOptions';
import Users from './screens/Users';
import Details from './screens/Details';
import EditDetails from './screens/EditDetails';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator screenOptions={dashboardOptions}>
      <Stack.Screen
        name="Users"
        options={drawerOptions}
        component={Users}
      />

      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="EditDetails" component={EditDetails} />
    </Stack.Navigator>
  );
}
