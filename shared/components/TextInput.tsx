import React, {ComponentProps, forwardRef, useState} from 'react';
import {
  View,
  StyleProp,
  StyleSheet,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInput as RNTextInput,
} from 'react-native';
import {
  Caption,
  Colors,
  TextInput as PaperInput,
  useTheme,
} from 'react-native-paper';
import ErrorLabel from './ErrorLabel';
import Spacer from './Spacer';

type PaperInputProps = ComponentProps<typeof PaperInput>;

type TextInput = PaperInputProps & {
  errorMessage?: string;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

const TextInput = forwardRef<RNTextInput, TextInput>(
  (
    {
      label,
      style,
      error,
      render,
      onBlur,
      onFocus,
      errorMessage,
      contentContainerStyle,
      ...props
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false);

    const {
      roundness,
      colors: {primary},
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
                  contentContainerStyle,
                ]}>
                {render ? (
                  render({...newProps, ref, style: styles.field} as any)
                ) : (
                  <RNTextInput {...newProps} ref={ref} style={styles.field} />
                )}
              </View>
            </Spacer>
          </View>
          {error && errorMessage && <ErrorLabel message={errorMessage} />}
        </Spacer>
      </View>
    );
  },
);

const styles = StyleSheet.create({
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

export default TextInput;
