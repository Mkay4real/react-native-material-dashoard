import React, {ReactNode} from 'react';
import {ScrollView, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Button from './Button';
import DecoHeader from './DecoHeader';
import Spacer from './Spacer';

type ScrollableDefaultScreen = {
  decorate?: boolean;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  action: {
    label: string;
    onPress(): void;
    loading?: boolean;
  };
};

export default function ScrollableDefaultScreen({
  style,
  action,
  children,
  decorate = false,
}: ScrollableDefaultScreen) {
  return (
    <ScrollView
      style={styles.screen}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {decorate && <DecoHeader />}
      <View style={[styles.wrapper, style]}>
        <Spacer gap={30}>
          {children}
          <Button loading={action?.loading} onPress={action.onPress}>
            {action.label}
          </Button>
        </Spacer>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    minHeight: '100%',
    backgroundColor: 'white',
  },
  wrapper: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  deco: {
    top: 0,
    right: 0,
    width: '30%',
    position: 'absolute',
  },
});
