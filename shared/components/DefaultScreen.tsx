import React, {ReactNode} from 'react';
import {Image, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Colors, Headline, Subheading} from 'react-native-paper';
import Button from './Button';
import DecoHeader from './DecoHeader';
import Screen from './Screen';
import Spacer from './Spacer';

type DefaultScreen = {
  title?: string;
  subtitle?: string;
  decorate?: boolean;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  action: {
    label: string;
    onPress(): void;
    loading?: boolean;
  };
};

export default function DefaultScreen({
  title,
  style,
  action,
  children,
  subtitle,
  decorate = false,
}: DefaultScreen) {
  return (
    <Screen style={styles.screen}>
      {decorate && <DecoHeader />}
      <View style={[styles.container, style]}>
        <Spacer gap={30}>
          <View>
            <Spacer>
              {title && <Headline>{title}</Headline>}
              {subtitle && (
                <Subheading style={{color: Colors.grey600}}>
                  {subtitle}
                </Subheading>
              )}
            </Spacer>
          </View>
          <View>{children}</View>
          <Button
            loading={action.loading}
            style={styles.btn}
            onPress={action.onPress}>
            {action.label}
          </Button>
        </Spacer>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 0,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  btn: {
    width: '100%',
  },
});
