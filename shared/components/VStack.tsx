import React, {ReactNode} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

type VStack = ViewStyle & {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function VStack({children, style, ...props}: VStack) {
  return (
    <View {...props} style={style}>
      {children}
    </View>
  );
}
