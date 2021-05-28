import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Colors,
  Headline,
  Subheading,
  Text,
  // TouchableRipple,
  useTheme,
} from 'react-native-paper';
import Button from '../../../shared/components/Button';
// import HStack from '../../../shared/components/HStack';
import Spacer from '../../../shared/components/Spacer';
import IntroHeader from '../components/IntroHeader';

export default function Main() {
  const nav = useNavigation();

  const {
    // roundness,
    colors: {primary},
  } = useTheme();

  return (
    <View style={style.screen}>
      <IntroHeader
        accessoryRight={
          <Button mode="text" style={style.ghost}>
            SKIP
          </Button>
        }
      />
      <View style={style.main}>
        <Spacer gap="10%">
          <View>
            <Spacer>
              <Headline>Get started</Headline>
              <Subheading style={{color: Colors.grey600, lineHeight: 20}}>
                Conveniently carry out business transactions from the comfort of
                your office or home.
              </Subheading>
            </Spacer>
          </View>
          <View>
            <Spacer gap="7%">
              <Button onPress={() => nav.navigate('AccountCreation')}>
                Get started
              </Button>
              <Button onPress={() => nav.navigate('Login')} style={style.btn}>
                <Text style={[style.btnLabel, {color: Colors.grey700}]}>
                  Have an account?{' '}
                </Text>
                <Text style={[style.btnLabel, {color: primary}]}>Login</Text>
              </Button>
              {/* <TouchableRipple onPress={() => nav.navigate('Login')}>
                <View style={[style.btn, {borderRadius: roundness}]}>
                  <Text style={[style.btnLabel, {color: Colors.grey700}]}>
                    Have an account?{' '}
                  </Text>
                  <Text style={[style.btnLabel, {color: primary}]}>Login</Text>
                </View>
              </TouchableRipple> */}
            </Spacer>
          </View>
        </Spacer>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  screen: {
    flex: 1,
  },
  main: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  mt2: {
    marginTop: 15,
  },
  hero: {
    flex: 1.5,
  },
  btn: {
    // paddingVertical: 20,
    flexDirection: 'row',
    // paddingHorizontal: 25,
    justifyContent: 'center',
    backgroundColor: 'rgba(9, 30, 66, 0.04)',
  },
  btnLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  ghost: {
    opacity: 0,
  },
});
