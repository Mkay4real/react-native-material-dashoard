import React from 'react';
import {Text} from 'react-native-paper';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

type RadioDot = {label: string; checked: boolean; onPress(): void};

export default function RadioDot({label, checked, onPress}: RadioDot) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.wrapper}>
      <View style={styles.container}>
        <View style={[styles.dot, checked && styles.checked]} />
      </View>

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
    width: 14,
    height: 14,
    borderWidth: 12,
    borderRadius: 100,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.0001)',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 100,
  },
  checked: {
    borderWidth: 0,
    backgroundColor: '#0052CC',
  },
});
