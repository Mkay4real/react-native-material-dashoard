import React, {ComponentProps} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {
  Text,
  Colors,
  useTheme,
  TouchableRipple,
  Button as PButton,
} from 'react-native-paper';
import HStack from './HStack';

type Button = ComponentProps<typeof PButton> & {type?: 'primary' | 'secondary'};

export default function Button({
  type,
  style,
  loading,
  onPress,
  children,
  labelStyle,
}: Button) {
  const {
    roundness,
    colors: {primary},
  } = useTheme();

  const isSecondary = type === 'secondary';

  return (
    <View
      style={[
        styles.btn,
        {
          borderRadius: roundness,
          backgroundColor: isSecondary ? 'rgba(9, 30, 66, 0.04)' : primary,
        },
        style,
      ]}>
      <TouchableRipple onPress={onPress} style={styles.btnContainer}>
        <HStack alignItems="center" justifyContent="center">
          {loading && (
            <ActivityIndicator
              size="small"
              color={Colors.white}
              style={styles.loader}
            />
          )}
          {typeof children === 'string' ? (
            <Text
              style={[
                styles.label,
                {color: isSecondary ? primary : Colors.white},
                labelStyle,
              ]}>
              {children}
            </Text>
          ) : (
            children
          )}
        </HStack>
      </TouchableRipple>
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    marginRight: 10,
  },
  btn: {
    overflow: 'hidden',
  },
  btnContainer: {
    paddingVertical: 16,
    paddingHorizontal: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    alignSelf: 'center',
  },
});
