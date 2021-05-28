import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {
  dashboardOptions,
  drawerOptions,
} from '../../../shared/utils/headerOptions';
import AddEmployee from './screens/AddEmployee';
import EmployeeDetails from './screens/EmployeeDetails';
import Employees from './screens/Employees';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator screenOptions={dashboardOptions}>
      <Stack.Screen
        name="Employees"
        component={Employees}
        options={drawerOptions}
      />

      <Stack.Screen
        name="EmployeeDetails"
        component={EmployeeDetails}
        options={{title: 'Employee details'}}
      />

      <Stack.Screen
        name="AddEmployee"
        component={AddEmployee}
        options={{title: 'Add new employees manually'}}
      />
    </Stack.Navigator>
  );
}
