import React, { ReactElement, ReactNode, useMemo, useState, ComponentProps } from 'react';
import { StyleProp, StyleSheet, ViewStyle, View, NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
import {
  Colors, Surface, Title, useTheme, Caption,
  TextInput as PaperInput,
} from 'react-native-paper';
import Spacer from './Spacer';
import { Picker } from '@react-native-picker/picker';
import { PickerProps } from '@react-native-picker/picker/typings/Picker';
import ErrorLabel from './ErrorLabel';

type Item = {
  label: string;
  value: string;
};

type CustomPicker = PickerProps & {
  forwardedRef?: any;
  label?: string;
  placeholder?: string;
  error?: boolean | undefined;
  errorMessage?: string;
  data: Array<Item>;
  style?: StyleProp<ViewStyle>;
  onBlur?: ComponentProps<typeof PaperInput>['onBlur'];
  onFocus?: ComponentProps<typeof PaperInput>['onFocus'];
  render?: ComponentProps<typeof PaperInput>['render'];
  onPress?(): void;
};

export default function CustomPicker({
  label,
  placeholder,
  style,
  error,
  data,
  render,
  onBlur,
  onFocus,
  errorMessage,
  forwardedRef,
  // contentContainerStyle,
  ...props

}: CustomPicker) {
  const {
    roundness,
    colors: { primary },
  } = useTheme();

  const _onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    onBlur?.(e);
    setFocused(false);
  };

  const _onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    onFocus?.(e);
    setFocused(true);
  };

  const newProps = {
    ...props,
    onBlur: _onBlur,
    onFocus: _onFocus,
  };

  const [focused, setFocused] = useState(false);

  return (
    <View style={style}>
      <Spacer>
        <View>
          <Spacer gap={7}>
            <Caption>{label}</Caption>
            <View
              style={[
                styles.container,
                error && styles.error,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  borderRadius: roundness,
                  borderColor: focused ? primary : '#DFE1E6',
                },
                // contentContainerStyle,
              ]}>
              {render ? (
                render({ ...newProps, ref: forwardedRef, style: styles.field } as any)
              ) : (
                  <Picker {...newProps} ref={forwardedRef} style={styles.field}>
                    {placeholder && <Picker.Item
                      value={undefined}
                      label={placeholder}
                    />
                    }
                    {data.map(({ label, value }) => {
                      return <Picker.Item label={(`${label} `)} value={value} />;
                    })}
                  </Picker>
                )}
            </View>
          </Spacer>
        </View>
        {error && errorMessage && <ErrorLabel message={errorMessage} />}
      </Spacer>
    </View>
  );
}

const styles = StyleSheet.create({
  warning: {
    backgroundColor: 'yellow',
  },
  success: {
    backgroundColor: 'green',
  },

  container: {
    borderWidth: 2,
    // borderColor: '#DFE1E6',
    backgroundColor: '#FAFBFC',
  },
  field: {
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 12,
    lineHeight: 16,
    color: '#686775',
    fontWeight: '600',
  },
  error: {
    borderColor: Colors.red600,
  },
});
