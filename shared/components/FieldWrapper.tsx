import React, {ReactNode} from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {useTheme} from 'react-native-paper';

export default function FieldWrapper({
  style,
  children,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const {roundness} = useTheme();

  return (
    <View style={[styles.wrapper, {borderRadius: roundness}, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 2,
    borderColor: '#DFE1E6',
    backgroundColor: '#FAFBFC',
  },
});
