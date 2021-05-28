import React, {ReactElement, ReactNode, useMemo} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {Colors, Surface, Title, useTheme} from 'react-native-paper';
import Spacer from './Spacer';

type Notification = {
  message: string;
  icon: ReactNode;
  style?: StyleProp<ViewStyle>;
  status: 'warning' | 'error' | 'success';
};

export default function Notification({
  icon,
  style,
  status,
  message,
}: Notification) {
  const {roundness} = useTheme();

  const notifStyle = useMemo(() => {
    switch (status) {
      case 'error':
        return styles.error;
      case 'warning':
        return styles.warning;
      case 'success':
        return styles.success;
    }
  }, [status]);

  return (
    <Surface
      style={[{borderRadius: roundness}, notifStyle, style]}>
      <Spacer gap={20} horizontal>
        {icon}
        <Title>{message}</Title>
      </Spacer>
    </Surface>
  );
}

const styles = StyleSheet.create({
  error: {
    backgroundColor: 'red',
  },
  warning: {
    backgroundColor: 'yellow',
  },
  success: {
    backgroundColor: 'green',
  },
});
