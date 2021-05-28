import React, {ReactNode} from 'react';
import {ScrollView, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Spacer from './Spacer';

// import Spacer from './Spacer';

type ScrollableScreen = {
  decorate?: boolean;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function ScrollableScreen({
  style,
  children,
  decorate = false,
}: ScrollableScreen) {
  return (
    <ScrollView
      style={styles.screen}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      >
      {/* {decorate && <DecoHeader />} */}
      <View style={[styles.wrapper, style]}>
        <Spacer gap={30}>
          {children}
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
