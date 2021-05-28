import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Subheading, Colors} from 'react-native-paper';
import ViewPager from '@react-native-community/viewpager';
import Dots from '../../../../shared/components/Dots';
import AccountCard from '../../../../shared/components/AccountCard';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Transfer from '../tabs/Transfer';
import Bills from '../tabs/Bills';
import Employees from '../tabs/Employees';
import {accounts} from '../../../../shared/utils/dummy_data';

const Tab = createMaterialTopTabNavigator();

export default function Payments() {
  const [currentStep, setStep] = useState(0);

  return (
    <View style={styles.screen}>
      <View style={styles.wrapper}>
        <ViewPager
          initialPage={0}
          style={styles.pager}
          onPageSelected={({nativeEvent}) => {
            setStep(nativeEvent.position);
          }}>
          {accounts.map((account) => (
            <View style={styles.page}>
              <AccountCard {...account} />
            </View>
          ))}
        </ViewPager>
        <View style={styles.dots}>
          <Dots count={accounts.length} step={currentStep} />
        </View>
      </View>
      <View style={styles.recepients}>
        <Subheading style={styles.padding20}>Previous recepients</Subheading>
        <Tab.Navigator tabBarOptions={{style: {paddingHorizontal: 10}}}>
          <Tab.Screen name="Transfer" component={Transfer} />
          <Tab.Screen name="Bills" component={Bills} />
          <Tab.Screen name="Employees" component={Employees} />
        </Tab.Navigator>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 0,
    backgroundColor: '#efeff3',
  },
  wrapper: {
    height: '40%',
  },
  pager: {
    flex: 1,
    width: '100%',
  },
  dots: {
    marginVertical: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  page: {
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  subheading: {
    margin: 10,
    color: Colors.grey600,
  },
  recepients: {
    flex: 1,
    backgroundColor: 'white',
  },
  padding20: {
    padding: 20,
  },
});
