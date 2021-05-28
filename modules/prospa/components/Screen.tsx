import React, {ReactNode} from 'react';
import {View, ViewProps, StyleSheet} from 'react-native';

type Screen = ViewProps & {
  children: ReactNode;
};

export default function Screen({style, children}: Screen) {
  return <View style={[screen.fill, style]}>{children}</View>;
}

const screen = StyleSheet.create({
  fill: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
});
