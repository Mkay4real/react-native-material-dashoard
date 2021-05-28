/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FlatList} from 'react-native';
import {Divider, Text} from 'react-native-paper';

const billers = ['DSTV', 'GoTV', 'StartTimes'];

export default function Biller() {
  return (
    <FlatList
      data={billers}
      ItemSeparatorComponent={Divider}
      renderItem={({item}) => <Text style={{padding: 20}}>{item}</Text>}
    />
  );
}
