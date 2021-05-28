import React from 'react';
import {View} from 'react-native';
import {Caption, Subheading, Title} from 'react-native-paper';
import {Button, TextInput} from '../../../exports';
import HStack from '../../../shared/components/HStack';
import Spacer from '../../../shared/components/Spacer';

import {useForm} from '../../../form';
import VStack from '../../../shared/components/VStack';
import Screen from '../../../shared/components/Screen';

export default function Profile() {
  const phoneNumber = '12345678';

  const {values} = useForm({
    schema: {
      phoneNumber: {
        initialValue: phoneNumber,
      },
    },
    onSubmit() {
      return Promise.resolve();
    },
  });

  return (
    <Screen style={{justifyContent: 'space-between'}}>
      <View>
        <Spacer gap={30}>
          <Title>John Doe</Title>

          <HStack alignItems="center" justifyContent="space-between">
            <View>
              <Caption>BVN</Caption>
              <Subheading>13456656576</Subheading>
            </View>
            <VStack alignItems="flex-end">
              <Caption>Email</Caption>
              <Subheading>johndoe@email.com</Subheading>
            </VStack>
          </HStack>

          <TextInput label="Phone number" value={values.phoneNumber} />
        </Spacer>
      </View>

      {phoneNumber !== values.phoneNumber && <Button>Save changes</Button>}
    </Screen>
  );
}
