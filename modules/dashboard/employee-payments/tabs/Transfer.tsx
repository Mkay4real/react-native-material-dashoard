import React from 'react';
import {View} from 'react-native';
import {Colors, Divider, Subheading, Title} from 'react-native-paper';
import {Button, VStack} from '../../../../exports';
import TransferIcon from '../../../../assets/transfer.svg';
import TabShell from '../../components/TabShell';

const EmptyState = () => {
  return (
    <VStack flex={1} alignItems="center" justifyContent="center">
      <TransferIcon width={56} height={56} color="#ccc" />
      <View>
        <Title>Make your first transfer</Title>
        <Subheading>send money to single or multiple recepients</Subheading>
      </View>
      <Button>Make transfer</Button>
    </VStack>
  );
};

const recepients = new Array(5).fill(0).map(() => {
  return {
    title: 'Tega & sons ltd',
    description: 'keystone bank | 123456',
  };
});

export default function Transfer() {
  return (
    <TabShell
      data={recepients}
      fallback={EmptyState}
      ItemSeparatorComponent={Divider}
      action={<Button>Transfer to new recipients</Button>}
      renderItem={({item: {title, description}}) => {
        return (
          <View style={{padding: 20}}>
            <Title>{title}</Title>
            <Subheading style={{color: Colors.grey600}}>
              {description}
            </Subheading>
          </View>
        );
      }}
    />
  );
}
