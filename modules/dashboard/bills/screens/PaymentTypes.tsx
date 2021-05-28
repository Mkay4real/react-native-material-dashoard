import React from 'react';
import {FlatList} from 'react-native';
import {Divider, Title} from 'react-native-paper';
import {VStack, Spacer} from '../../../../exports';
import SearchInput from '../../components/SearchInput';

const paymentTypes = [
  'TV Subscriptions',
  'Internet services',
  'Utility and Electricity',
  'Insurance',
  'Remita',
];

export default function PaymentTypes() {
  return (
    <VStack alignItems="center">
      <Spacer gap={20}>
        <SearchInput />
        <FlatList
          data={paymentTypes}
          ItemSeparatorComponent={Divider}
          renderItem={({item}) => {
            return <Title>{item}</Title>;
          }}
        />
      </Spacer>
    </VStack>
  );
}
