import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {
  Button as PaperButton,
  Caption,
  Colors,
  Divider,
  Headline,
  Subheading,
} from 'react-native-paper';
import {Spacer, TextInput} from '../../../../exports';
import HStack from '../../../../shared/components/HStack';
import ScrollableDefaultScreen from '../../../../shared/components/ScrollableDefaultScreen';
import VStack from '../../../../shared/components/VStack';
import {accounts, employees} from '../../../../shared/utils/dummy_data';
import Accounts from '../../components/Accounts';
import AuthorizeTransaction from '../../components/AuthorizeTransaction';
import EmployeeList from '../../components/EmployeeList';
import TransactionSheet from '../../components/TransactionSheet';

const data = employees.slice(0, 3);

export default function Salaries() {
  const nav = useNavigation();
  const [openAuth, setOpenAuth] = useState(false);
  const [openTransaction, setOpenTransaction] = useState(false);

  useEffect(() => {
    if (openAuth) {
      setOpenTransaction(false);
    }
  }, [openAuth]);

  return (
    <ScrollableDefaultScreen
      action={{
        label: 'Initiate payment',
        onPress: () => setOpenTransaction(true),
      }}>
      <Spacer gap={20}>
        <View>
          <Subheading style={{color: Colors.grey600, paddingHorizontal: 10}}>
            Select an account
          </Subheading>
          <Accounts data={accounts} />
          <Divider />
        </View>
        <View style={{padding: 10}}>
          <Spacer>
            <HStack justifyContent="space-between">
              <Subheading style={{paddingHorizontal: 10}}>
                Employee details
              </Subheading>
              <PaperButton
                mode="text"
                onPress={() => nav.navigate('Employees')}>
                view all
              </PaperButton>
            </HStack>
            <EmployeeList data={data} showSalary={true} />
          </Spacer>
        </View>
        <Divider />
        <VStack padding={10}>
          <Spacer gap={10}>
            <View>
              <Subheading style={{color: Colors.grey600}}>
                Total amount
              </Subheading>
              <Headline>#2,000,000</Headline>
            </View>
            <TextInput placeholder="Narration" />
            <Caption>
              This payment will be approved by 2 more people before it is sent
              out.
            </Caption>
          </Spacer>
        </VStack>
      </Spacer>

      <TransactionSheet
        title="Confirm transfer"
        visible={openTransaction}
        onConfirm={() => setOpenAuth(true)}
        onDismiss={() => setOpenTransaction(false)}
        caption="This payment will warrant a charge of #2,000"
        description="Transfer #2,000,000 to 78 employees in total?"
      />

      <AuthorizeTransaction
        visible={openAuth}
        // onCancel={() => {}}
        // onAuthorized={() => {}}
      />
    </ScrollableDefaultScreen>
  );
}
