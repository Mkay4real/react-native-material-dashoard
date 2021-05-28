import React, {ReactNode} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

type HStack = ViewStyle & {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function HStack({children, style, ...props}: HStack) {
  return (
    <View {...props} style={[styles.row, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});
