import React from 'react';
import {Text, useTheme} from 'react-native-paper';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

type RadioDot = {label: string; checked: boolean; onPress(): void};

export default function CheckBox({label, checked, onPress}: RadioDot) {
  const {
    colors: {primary},
  } = useTheme();

  return (
    <TouchableOpacity onPress={onPress} style={styles.wrapper}>
      <View
        style={[
          styles.container,
          checked && {borderWidth: 0, backgroundColor: primary},
        ]}
      />
      <Text style={{marginStart: 10}}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    width: 12,
    height: 12,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#ccc',
    backgroundColor: '#FAFBFC',
  },
});
