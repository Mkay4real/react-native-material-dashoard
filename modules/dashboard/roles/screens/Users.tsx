import React from 'react';
import {Caption, Divider, Text, TouchableRipple} from 'react-native-paper';
import {FlatList, View} from 'react-native';
import {Button, HStack, VStack} from '../../../../exports';
import Spacer from '../../../../shared/components/Spacer';
import {useNavigation} from '@react-navigation/native';

const users = [
  {
    id: '1',
    name: 'Tolani Adetunji',
    email: 'ola@email.com',
    role: 'Initiator',
  },
  {
    id: '2',
    name: 'Tolani Adetunji',
    email: 'ola@email.com',
    role: 'Approver',
  },
  {
    id: '3',
    name: 'Tolani Adetunji',
    email: 'ola@email.com',
    role: 'Approver',
  },
];

export default function Users() {
  const nav = useNavigation();

  return (
    <VStack justifyContent="space-between">
      <FlatList
        data={users}
        ItemSeparatorComponent={Divider}
        renderItem={({item: {id, name, email, role}}) => {
          return (
            <TouchableRipple
              onPress={() => {
                nav.navigate('Details', {id});
              }}>
              <View style={{padding: 20}}>
                <Text>{name}</Text>
                <HStack alignItems="center" justifyContent="space-between">
                  <Spacer>
                    <Caption>{email}</Caption>
                    <Caption>{role}</Caption>
                  </Spacer>
                </HStack>
              </View>
            </TouchableRipple>
          );
        }}
      />

      <View
        style={{
          padding: 20,
          borderTopWidth: 1,
          backgroundColor: '#FAFAFF',
          borderTopColor: 'rgba(204, 204, 216, 0.5)',
        }}>
        <Button
          onPress={() => {
            nav.navigate('EditDetails');
          }}>
          Add new users
        </Button>
      </View>
    </VStack>
  );
}
