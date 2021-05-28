import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {mainOptions} from '../../shared/utils/headerOptions';
import AccountDetails from './screens/AccountDetails';
import AccountValidation from './screens/AccountValidation';
import AdminDetails from './screens/AdminDetails';
import BusinessDetails from './screens/BusinessDetails';
import OnboardingDone from './screens/OnboardingDone';
import Otp from './screens/Otp';
import appAuthStore from '../../shared/stores/appAuth';
import { getApprovalToken } from '../../shared/services/approvalToken';
import { getUserToken } from '../../shared/services/userToken';
import AdminCheckerDetails from './screens/AdminCheckerDetails';

const Stack = createStackNavigator();

const App = () => {

  const {setUserToken, setApprovalToken} = appAuthStore(({setApprovalToken,setUserToken}) => ({setApprovalToken, setUserToken}));

  React.useEffect(() => {
    (async () => {
      console.log('getting approval token');
      const token = await getApprovalToken();
      console.log("approval", token);
      setApprovalToken(token);
    })();
  }, [setApprovalToken]);

  React.useEffect(() => {
    (async () => {
      console.log('getting user token');
      const token = await getUserToken();
      console.log("user",token);
      setUserToken(token);
    })();
  }, [setUserToken]);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="AccountValidation" component={AccountValidation} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="BusinessDetails" component={BusinessDetails} />
      <Stack.Screen name="AccountDetails" component={AccountDetails} />
      <Stack.Screen name="AdminDetails" component={AdminDetails} />
      <Stack.Screen name="AdminCheckerDetails" component={AdminCheckerDetails} />
      <Stack.Screen
        options={mainOptions}
        name="OnboardingDone"
        component={OnboardingDone}
      />
    </Stack.Navigator>
  );
};

export default App;
