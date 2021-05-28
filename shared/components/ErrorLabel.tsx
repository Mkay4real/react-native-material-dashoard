import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Colors, Text } from 'react-native-paper';
import Alert from '../../assets/alert-octagon.svg';
import HStack from './HStack';
import Spacer from './Spacer';

export default function ErrorLabel({ style, message }: { message: string, style?: StyleProp<ViewStyle> }) {
  return (
    <HStack style={style} alignItems="center">
      <Spacer horizontal>
        <Alert width={20} height={20} color={Colors.red600} />
        <Text style={{ color: Colors.red600 }}>{message}</Text>
      </Spacer>
    </HStack>
  );
}
