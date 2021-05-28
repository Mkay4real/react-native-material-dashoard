import React, {ReactElement} from 'react';
import {
  Dimensions,
  Image,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

type Header = {
  style?: StyleProp<ViewStyle>;
  accessoryRight?: ReactElement;
};

export default function Header({style}: Header) {
  return (
    <View style={[style, styles.header]}>
      <Image
        style={styles.image}
        source={require('../../../assets/login-ring.png')}
      />
    </View>
  );
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
