import React, { forwardRef, useCallback, useState } from 'react';
import { TextInput as RNTextInput, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import EyeOff from '../../assets/eye-off.svg';
import Eye from '../../assets/eye.svg';
import ErrorLabel from './ErrorLabel';
import HStack from './HStack';
import Spacer from './Spacer';
import TextInput from './TextInput';

const PasswordInput = forwardRef<RNTextInput, TextInput>((props, ref) => {
  const [isSecureEntry, setIsSecureEntry] = useState(true);

  const toggle = useCallback(() => {
    setIsSecureEntry((isSecure) => !isSecure);
  }, []);

  return (
    <TextInput
      {...props}
      secureTextEntry={isSecureEntry}
      render={({ error, style, errorMessage, ...inputProps }: any) => {
        return (
          <HStack alignItems="center">
            <RNTextInput {...inputProps} style={[style, { flex: 1 }]} ref={ref} />
            <IconButton
              onPress={toggle}
              icon={(iconProps) => {
                return isSecureEntry ? (
                  <Eye {...iconProps} />
                ) : (
                    <EyeOff {...iconProps} />
                  );
              }}
            />
          </HStack>
        );
      }}
    />
  );
});

export default PasswordInput;
