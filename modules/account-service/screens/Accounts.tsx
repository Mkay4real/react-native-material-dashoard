import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  Colors,
  IconButton,
  Subheading,
  Surface,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import Plus from '../../../assets/plus.svg';
import Screen from '../../../shared/components/Screen';
import AccountCard from '../../../shared/components/AccountCard';

const data = [
  {
    balance: '5,000,000',
    accountName: 'Acc Name',
    accountNumber: '123456',
  },
  {
    balance: '5,000,000',
    accountName: 'Acc Name',
    accountNumber: '123456',
  },
  {
    balance: '5,000,000',
    accountName: 'Acc Name',
    accountNumber: '123456',
  },
];

export default function Accounts() {
  const {
    colors: {primary},
  } = useTheme();

  const nav = useNavigation();

  return (
    <Screen style={styles.screen}>
      <FlatList
        data={data}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({item, index}) => {
          return (
            <AccountCard
              {...item}
              key={index+30}
              color={index === 0 ? primary : undefined}
              onPress={() => nav.navigate('AccountDetails')}
            />
          );
        }}
      />
      <Surface style={styles.btn}>
        <View>
          <View style={[styles.ring, styles.outerRing]} />
          <View style={[styles.ring, {backgroundColor: primary}]} />
          <TouchableRipple>
            <View style={styles.btnContainer}>
              <Subheading>Open a new account</Subheading>
              <View style={styles.iconBtn}>
                <IconButton
                  color="black"
                  icon={(props) => <Plus {...props} />}
                />
              </View>
            </View>
          </TouchableRipple>
        </View>
      </Surface>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 0,
    justifyContent: 'space-between',
  },
  btn: {
    elevation: 3,
    // borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    overflow: 'hidden',
    marginHorizontal: 20,
    backgroundColor: Colors.white,
    borderColor: 'rgba(204, 204, 216, 0.5)',
  },
  btnContainer: {
    paddingVertical: 19,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 25,
    justifyContent: 'space-between',
  },
  iconBtn: {
    borderRadius: 100,
    backgroundColor: 'white',
  },
  separator: {
    height: 20,
  },
  list: {
    padding: 25,
  },
  ring: {
    top: -25,
    zIndex: 0,
    right: -90,
    width: 190,
    height: 190,
    borderRadius: 200,
    position: 'absolute',
    transform: [{scaleX: 1.3}],
  },
  outerRing: {
    width: 210,
    height: 210,
    borderWidth: 4,
    borderColor: '#E8C45F',
  },
});
