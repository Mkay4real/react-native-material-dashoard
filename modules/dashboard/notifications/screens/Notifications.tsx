import {useNavigation} from '@react-navigation/native';
import {format} from 'date-fns';
import lo from 'lodash';
import React from 'react';
import {useGlobalize} from 'react-native-globalize';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  Button,
  Colors,
  Headline,
  Subheading,
  Surface,
  Title,
  useTheme,
} from 'react-native-paper';

const notifications = [
  {
    id: '1',
    amount: 30000,
    date: new Date(),
    type: 'FundTransfer',
    initiator: 'Goke Ademola',
  },
  {
    id: '2',
    amount: 30000,
    date: new Date(),
    type: 'BillPayment',
    initiator: 'Goke Ademola',
  },
  {
    id: '2',
    amount: 30000,
    date: new Date(),
    type: 'SalaryPayment',
    initiator: 'Goke Ademola',
  },
];

export default function Notifications() {
  const nav = useNavigation();
  const {roundness} = useTheme();

  // const {formatCurrency} = useGlobalize();

  return (
    <FlatList
      data={notifications}
      keyExtractor={({id}) => id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({item: {id, date, type, amount, initiator}}) => {
        return (
          <Surface style={[styles.card, {borderRadius: roundness}]}>
            <View style={styles.header}>
              <Title>{lo.startCase(type)}</Title>
              {/* <Headline>{formatCurrency(amount, 'NGN')}</Headline> */}
              <Headline>{(amount+ 'NGN')}</Headline>
              <Subheading style={styles.grey}>
                Initiated by {initiator}
              </Subheading>
            </View>

            <View style={styles.footer}>
              <Subheading style={styles.grey}>
                {format(date, 'dd MM yyyy, HH:mm')}
              </Subheading>
              <Button
                onPress={() => {
                  nav.navigate('Details', {id, type});
                }}>
                View details
              </Button>
            </View>
          </Surface>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: 'rgba(204, 204, 216, 0.5)',
  },
  header: {
    margin: 10,
  },
  footer: {
    padding: 10,
    opacity: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(204, 204, 216, 0.5)',
  },
  grey: {
    color: Colors.grey400,
  },
  separator: {
    height: 16,
  },
});
