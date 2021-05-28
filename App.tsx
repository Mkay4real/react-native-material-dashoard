/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Linking } from 'react-native';
import 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import Prospa from './modules/prospa/App';
import { mainOptions } from './shared/utils/headerOptions';
import theme from './shared/utils/theme';
import { _navigator } from './shared/utils/NavigationService';

// React Hooks: Refs
// const navigationRef: React.RefObject<NavigationContainerRef> = React.useRef(null);

const useMount = (func: Function, cleanup?: Function | any) =>
  useEffect(() => {
    func();
    return cleanup;
  }, []);


const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaView style={style.fill}>
      <PaperProvider theme={theme}>
        {/* <NavigationContainer ref={_navigator} linking={linking} fallback={<Text>Loading ...</Text>}> */}
        <NavigationContainer ref={_navigator}>
          <Stack.Navigator
            initialRouteName="Prospa"
            // initialRouteName="Onboarding"
            screenOptions={mainOptions}>
            <Stack.Screen name="Prospa" component={Prospa} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  fill: {
    flex: 1,
  },
});

export default App;
