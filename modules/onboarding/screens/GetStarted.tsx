import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {Colors, Headline, Paragraph} from 'react-native-paper';
import Button from '../../../shared/components/Button';
import Screen from '../../../shared/components/Screen';
import Spacer from '../../../shared/components/Spacer';
import Header from '../components/Header';

export default function GetStarted() {
  const nav = useNavigation();

  return (
    <Screen>
      <Header />
      <View style={style.hero}>
        <ImageBackground
          style={style.bg}
          source={require('../../../assets/intro_bg.png')}
        />
        <Header style={{marginTop: 30}} />
      </View>
      <View style={style.main}>
        <Spacer>
          <Headline>Get started</Headline>
          <Paragraph style={style.mt1}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur
            dolores natus totam aperiam vero iure assumenda a! Veritatis
            deserunt esse aspernatur sed possimus, aperiam beatae. Ratione minus
            fugiat blanditiis facere.
          </Paragraph>
        </Spacer>
        <Button mode="contained" style={style.mt2}>
          Get started
        </Button>
        <Button
          style={style.mt3}
          color={Colors.grey300}
          onPress={() => nav.navigate('Login')}>
          Have an account? Login
        </Button>
      </View>
    </Screen>
  );
}

const style = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  mt1: {
    marginTop: 10,
  },
  mt2: {
    marginTop: 15,
  },
  mt3: {
    marginTop: 20,
  },
  bg: {
    width: '100%',
    height: '100%',
    ...StyleSheet.absoluteFillObject,
  },
  hero: {
    height: '70%',
    borderWidth: 2,
    borderColor: 'red',
  },
});
