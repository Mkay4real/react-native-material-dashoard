import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react'; 
import {
  drawerOptions,
  dashboardOptions,
  mainOptions,
} from '../../shared/utils/headerOptions';
import Accounts from './screens/accounts';
import AccountInfo from './screens/accountinfo';
// import Dashboard from './screens/dashboard';
import Splash from './screens/splash';
import SignIn from './screens/signin';
import { Image, TouchableWithoutFeedback, View } from 'react-native';
import RF from './utils/RF';
import { Text } from 'react-native-paper';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const AccountsRoute = () => <Accounts/>;
const TransferRoute = () => <Text style={{alignSelf:'center'}}>Transfer</Text>;
const InvoiceRoute = () => <Text style={{alignSelf:'center'}}>Invoice</Text>;
// const InvoiceRoute = () => <AccountInfo/>;
const MoreRoute = () => <Text style={{alignSelf:'center'}}>More</Text>;

const primary ="#FA4A84";

const Dashboard = () => (
  <Tab.Navigator
    initialRouteName="Accounts" 
    screenOptions={({route}) => ({ 
      // tabBarButton: (props)=> (
      //   <TouchableOpacity {...props}  style={{borderTopWidth: 3}} />
      // ),
      tabBarIcon: ({focused}) => {
        if (route.name === 'Accounts') {
          if (focused) {
            return (
              <Image
                source={require(`./assets/tab_accounts.png`)}
                style={{width: RF(18), height: RF(18)}}
                resizeMode="contain"
              />
            );
          } else {
            return (
              <Image
              source={require(`./assets/tab_accounts.png`)}
                style={{width: RF(18), height: RF(18)}}
                resizeMode="contain"
              />
            );
          }
        } else if (route.name === 'Transfer') {
          if (focused) {
            return (
              <>
              {/* <View style={{height: RF(2), position: 'absolute', bottom: 0, width: '100%', backgroundColor: primary}}/> */}
              <Image
              source={require(`./assets/tab_transfer.png`)}
                style={{width: RF(18), height: RF(18)}}
                resizeMode="contain"
              />
              </>
            );
          } else {
            return (
              <Image
              source={require(`./assets/tab_transfer.png`)}
                style={{width: RF(18), height: RF(18)}}
                resizeMode="contain"
              />
            );
          }
        } else if (route.name === 'Invoice') {
          if (focused) {
            return (
              <Image
              source={require(`./assets/tab_invoice.png`)}
                style={{width: RF(18), height: RF(18)}}
                resizeMode="contain"
              />
            );
          } else {
            return (
              <Image
              source={require(`./assets/tab_invoice.png`)}
                style={{width: RF(18), height: RF(18)}}
                resizeMode="contain"
              />
            );
          }
        } else if (route.name === 'More') {
          if (focused) {
            return (
              <Image
              source={require(`./assets/tab_more.png`)}
                style={{width: RF(18), height: RF(18)}}
                resizeMode="contain"
              />
            );
          } else {
            return (
              <Image
              source={require(`./assets/tab_more.png`)}
                style={{width: RF(18), height: RF(18)}}
                resizeMode="contain"
              />
            );
          }
        }
      },
      
    })}
    
    tabBarOptions={{
      
      showLabel: true,
      activeTintColor: primary,
      inactiveTintColor: 'rgba(0,0,0,0.5)',
      labelStyle: {
        fontSize: RF(12),
        fontFamily: 'Avenir-Roman',
        fontWeight: '800',
        margin: 0,
      },
      style: {
        maxHeight: RF(74),
        borderTopColor: 'transparent',
        backgroundColor: '#FFFFFF',
        borderTopWidth: RF(13), 
        // borderTopColor: '#F1F1F1',
      },
    }}>
    <Tab.Screen name="Accounts" component={Accounts} />
    <Tab.Screen name="Transfer" component={TransferRoute} />
    <Tab.Screen name="Invoice" component={InvoiceRoute} />
    <Tab.Screen name="More" component={MoreRoute} />
  </Tab.Navigator>
);

export default function App() {
  return (
    <Stack.Navigator //screenOptions={dashboardOptions}
    initialRouteName="Splash"
    screenOptions={mainOptions}
    >
      
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen
        name="Accounts"
        component={Accounts}
        // options={drawerOptions}
      />
      <Stack.Screen name="AccountInfo" component={AccountInfo} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Splash" component={Splash} />
      
    </Stack.Navigator>
  );
}
