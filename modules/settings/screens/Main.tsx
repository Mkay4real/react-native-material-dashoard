import React from 'react';
import {List, Divider} from 'react-native-paper';
import {FlatList, StyleSheet} from 'react-native';
import ChevronRight from '../../../assets/chevron-right.svg';
import {useNavigation} from '@react-navigation/native';

const options = [
  {label: 'Profile', route: 'Profile'},
  {label: 'Login & Security', route: 'Security'},
  {label: 'Chat support', route: 'Support'},
  {label: 'Terms & Privacy', route: 'TAC'},
];

export default function Main() {
  const nav = useNavigation();

  return (
    <FlatList
      data={options}
      ItemSeparatorComponent={Divider}
      renderItem={({item: {label, route}}) => {
        return (
          <List.Item
            title={label}
            style={styles.item}
            onPress={() => nav.navigate(route)}
            right={(props) => <ChevronRight {...props} />}
          />
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 15,
  },
});
