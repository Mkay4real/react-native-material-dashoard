import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View} from 'react-native';
import {Spacer, Button, TextInput} from '../../../../exports';
import FieldWrapper from '../../../../shared/components/FieldWrapper';
import HStack from '../../../../shared/components/HStack';
import TransactionSheet from '../../components/TransactionSheet';

export default function Details() {
  const nav = useNavigation();
  const [show, setShow] = useState(false);

  return (
    <>
      <View>
        <HStack alignItems="center">
          <Spacer gap={20} horizontal>
            <Button
              type="secondary"
              onPress={() => setShow(true)}
              labelStyle={{color: '#F23030'}}>
              Decline
            </Button>
            <Button style={{backgroundColor: '#00875A'}}>Approve</Button>
          </Spacer>
        </HStack>
      </View>

      <TransactionSheet
        visible={show}
        positiveButton={{
          label: 'Decline payment',
          onPress: () => {
            setShow(false);
            nav.goBack();
          },
        }}
        onDismiss={() => setShow(false)}
        description="Give a reason for declining"
        title="You're about to decline a payment request">
        <TextInput placeholder="Give a reason" style={{minHeight: 40}} />
      </TransactionSheet>
    </>
  );
}
