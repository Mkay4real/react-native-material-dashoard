import {
  useNavigation,
  useRoute,
  useNavigationState,
} from '@react-navigation/native';
import {HeaderTitle} from '@react-navigation/stack';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import ChevronLeft from '../../assets/chevron-left.svg';
import HStack from './HStack';

export default function DecoHeader() {
  const nav = useNavigation();
  const {name} = useRoute();
  const routes = useNavigationState(({routes}) => routes);

  return (
    <View>
      <Image
        style={styles.deco}
        source={require('../../assets/pages-ring.png')}
      />
      <View style={styles.wrapper}>
        {routes.length > 0 && (
          <IconButton
            onPress={nav.goBack}
            icon={(props) => <ChevronLeft {...props} />}
          />
        )}
        <HeaderTitle />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  back: {
    color: 'black',
    marginRight: 10,
  },
  deco: {
    top: 0,
    right: 0,
    width: '80%',
    position: 'absolute',
  },
});
