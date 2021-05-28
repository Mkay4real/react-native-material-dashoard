import React from 'react';
import {FlatList, StyleProp, View, ViewStyle} from 'react-native';
import {Caption, Divider, Subheading, Title} from 'react-native-paper';
import {HStack} from '../../../exports';

type Account = {
  balance: string;
  accountName: string;
  accountNumber: string;
};

export default function Accounts({
  data,
  style,
}: {
  data: Account[];
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <FlatList
      data={data}
      style={style}
      ItemSeparatorComponent={Divider}
      renderItem={({item: {accountName, accountNumber, balance}}) => {
        return (
          <HStack padding={10} justifyContent="space-between">
            <Title>{balance}</Title>
            <HStack>
              <View>
                <Caption>{accountName}</Caption>
                <Subheading>{accountNumber}</Subheading>
              </View>
              {/* TODO: radio button */}
            </HStack>
          </HStack>
        );
      }}
    />
  );
}
