import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {
  drawerOptions,
  dashboardOptions,
} from '../../shared/utils/headerOptions';
import AccountDetails from './screens/AccountDetails';
import Accounts from './screens/Accounts';
import AccountServices from './screens/AccountServices';
import CheckbookRequest from './screens/CheckbookRequest';
import DemandDraftRequest from './screens/DemandDraftRequest';
import StopChequeRequest from './screens/StopChequeRequest';
import StandingOrderRequest from './screens/StandingOrderRequest';
import AccountStatementRequest from './screens/AccountStatementRequest';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator screenOptions={dashboardOptions}>
      <Stack.Screen
        name="Accounts"
        component={Accounts}
        options={drawerOptions}
      />
      <Stack.Screen name="AccountDetails" component={AccountDetails} />
      <Stack.Screen name="AccountServices" component={AccountServices} />
      <Stack.Screen name="CheckbookRequest" component={CheckbookRequest} />
      <Stack.Screen name="DemandDraftRequest" component={DemandDraftRequest} />
      <Stack.Screen name="StopChequeRequest" component={StopChequeRequest} />
      <Stack.Screen name="StandingOrderRequest" component={StandingOrderRequest} />
      <Stack.Screen name="AccountStatementRequest" component={AccountStatementRequest} />
    </Stack.Navigator>
  );
}
