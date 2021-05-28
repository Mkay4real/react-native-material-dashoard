import React, {ReactElement} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import Logo from '../../../assets/logo.svg';
import VStack from '../../../shared/components/VStack';

export default function IntroHeader({
  accessoryRight,
}: {
  accessoryRight?: ReactElement;
}) {
  return (
    <View style={style.hero}>
      {accessoryRight && (
        <VStack padding={10} marginBottom={10} alignItems="flex-end">
          {accessoryRight}
        </VStack>
      )}
      <View style={style.heroWrapper}>
        <ImageBackground
          style={style.bg}
          source={require('../../../assets/intro-ring.png')}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  hero: {
    flex: 2,
    alignItems: 'flex-end',
  },
  heroWrapper: {
    flex: 1,
    width: '100%',
  },
  bg: {
    width: '100%',
    height: '100%',
  },
});
