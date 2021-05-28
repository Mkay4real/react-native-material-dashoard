import React, { ReactElement } from 'react';
import {
  Dimensions,
  Image,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  TouchableOpacity,
  Animated,
  GestureResponderEvent,
} from 'react-native';
import FingerPrint from '../../../assets/finger-print.svg';
import Biometrics from 'react-native-biometrics';
import { SvgProps, Color } from 'react-native-svg';
import Button from '../../../shared/components/Button';
import { Colors } from 'react-native-paper';
import { color } from 'react-native-reanimated';

type Header = {
  style?: StyleProp<ViewStyle>;
  accessoryRight?: ReactElement;
};
type BioType = {
  type: string;
  // action: (event: GestureResponderEvent) => Function;
  action(): void;
  opacity?: number;
  animate?: number;
  color?: Color;
  accessoryRight?: ReactElement;
};

export const BiometricsType = (props: BioType) => {
  if (props.type === Biometrics.TouchID) {
    return (
      <Button
        onPress={props.action}
        style={{ marginStart: 10, backgroundColor: Colors.grey300 }}>
        <FingerPrint width={24} height={24} color={props.color} />
      </Button>
    )
  } else if (props.type === Biometrics.FaceID) {
    return (
      <Button
        onPress={props.action}
        style={{ marginStart: 10, backgroundColor: Colors.grey300 }}>
        <FingerPrint width={24} height={24} color={props.color} />
      </Button>
    )
  } else {
    return (
      null
    )
  }
}


const styles = StyleSheet.create({
  header: {
    flex: 1,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  image: {
    height: '100%',
    width: '100%',
  },
});
