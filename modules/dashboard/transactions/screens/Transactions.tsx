import {format, formatRelative} from 'date-fns';
import {startCase} from 'lodash';
import React from 'react';
import {SectionList, View} from 'react-native';
import {useGlobalize} from 'react-native-globalize';
import {
  Caption,
  Divider,
  Subheading,
  Text,
  Title,
  TouchableRipple,
} from 'react-native-paper';
import {HStack} from '../../../../exports';
import Spacer from '../../../../shared/components/Spacer';

import Approved from '../../../../assets/approved.svg';
import Declined from '../../../../assets/declined.svg';
import {useNavigation} from '@react-navigation/native';

const transactions = [
  {
    id: '1',
    amount: 30000,
    approved: true,
    date: new Date(),
    type: 'BillPayment',
    recipient: 'Goke Ademola',
  },
  {
    id: '2',
    amount: 30000,
    approved: false,
    date: new Date(),
    type: 'BillPayment',
    recipient: 'Goke Ademola',
  },
];

const sections = [
  {
    date: new Date(),
    data: transactions,
  },
  {
    date: new Date(),
    data: transactions,
  },
  {
    date: new Date(),
    data: transactions,
  },
];

const size = 20;

export default function Transactions() {
  const nav = useNavigation();
  // const {formatCurrency} = useGlobalize();

  return (
    <SectionList
      sections={sections}
      keyExtractor={({id}) => id}
      ItemSeparatorComponent={Divider}
      renderSectionHeader={({section: {date}}) => {
        return <Text>{formatRelative(date, new Date())}</Text>;
      }}
      renderItem={({item: {id, type, date, amount, approved, recipient}}) => {
        return (
          <TouchableRipple
            onPress={() => {
              nav.navigate('Details', {id, type});
            }}>
            <HStack padding={20} alignItems="center" justifyContent="center">
              <View>
                <Spacer gap={20} horizontal>
                  {approved ? (
                    <Approved width={size} height={size} />
                  ) : (
                    <Declined width={size} height={size} />
                  )}
                  <View>
                    <Subheading>{startCase(type).toUpperCase()} TO</Subheading>
                    <Title>{recipient}</Title>
                  </View>
                </Spacer>
              </View>

              <View>
                <Title>{(amount)}</Title>
                {/* <Title>{formatCurrency(amount)}</Title> */}
                <Caption>{format(date, 'HH:mm')}</Caption>
              </View>
            </HStack>
          </TouchableRipple>
        );
      }}
    />
  );
}
