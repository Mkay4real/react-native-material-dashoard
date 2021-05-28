/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Colors} from 'react-native-paper';
import useAsync from '../../shared/hooks/useAsync';
import {mainOptions, options} from '../../shared/utils/headerOptions';
import Intro from './screens/Intro';
import GetStarted from './screens/GetStarted';
import Login from './screens/Login';
import Main from './screens/Main';
import ChangePassword from '../settings/screens/ChangePassword';

const Stack = createStackNavigator();

const App = () => {
  // const newHolder = useAsync(true, async () => {
  //   const holder = await AsyncStorage.getItem('newHolder');
  //   return holder ? false : true;
  // });

  return (
    <Stack.Navigator screenOptions={mainOptions}>
      <Stack.Screen name="Intro" component={Intro} />
      {/* {newHolder && <Stack.Screen name="Intro" component={Intro} />} */}
      <Stack.Screen name="MainIntro" component={Main} />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          ...options,
          headerTransparent: true,
          headerTintColor: Colors.white,
        }}
      />
        <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{title: 'Change password'}}
      />
    </Stack.Navigator>
  );
};

export default App;
