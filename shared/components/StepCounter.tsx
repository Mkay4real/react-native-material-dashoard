/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback} from 'react';
import {StyleProp, StyleSheet, Text, ViewStyle} from 'react-native';
import {Colors} from 'react-native-paper';
import Button from './Button';
import HStack from './HStack';
import Padding from './Padding';
import Spacer from './Spacer';

type StepFunction = (value: number) => void;

type StepCounter = {
  value?: number;
  minimum?: number;
  onDecrement?: StepFunction;
  onIncrement?: StepFunction;
  style?: StyleProp<ViewStyle>;
};

export default function StepCounter({
  style,
  value = 0,
  minimum = 0,
  onDecrement,
  onIncrement,
}: StepCounter) {
  const increment = useCallback(() => {
    onIncrement?.(value + 1);
  }, [value]);

  const decrement = useCallback(() => {
    onDecrement?.(value == minimum? minimum: value - 1);
  }, [value]);

  return (
    <HStack style={style} alignItems="center">
      <Spacer horizontal>
        <Button
          style={{
            borderWidth: 2,
            borderColor: '#DFE1E6',
            backgroundColor: '#FAFBFC',
          }}
          onPress={decrement}>
          <Text style={[styles.label, {color: '#ccc'}]}>-</Text>
        </Button>
        <Padding>
          <Text style={[styles.label, {color: Colors.black}]}>{value}</Text>
        </Padding>
        <Button onPress={increment}>
          <Text style={styles.label}>+</Text>
        </Button>
      </Spacer>
    </HStack>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: 'white',
    lineHeight: 20,
    fontWeight: 'bold',
  },
});
