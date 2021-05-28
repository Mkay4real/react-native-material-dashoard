import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Caption, Divider, List, Text} from 'react-native-paper';
import {Button, Spacer, TextInput} from '../../../../exports';
import VStack from '../../../../shared/components/VStack';
import {accounts} from '../../../../shared/utils/dummy_data';
import Accounts from '../../components/Accounts';
import AuthorizeTransaction from '../../components/AuthorizeTransaction';
import TransactionDoneSheet from '../../components/TransactionDoneSheet';
import TransactionSheet from '../../components/TransactionSheet';

export default function BillPayment() {
  // bottom sheets states
  const [openDone, setOpenDone] = useState(true);
  const [openTransaction, setOpenTransaction] = useState(true);
  const [openAuthorization, setOpenAuthorization] = useState(true);

  return (
    <ScrollView>
      <View>
        <Spacer>
          <Text>Select account</Text>
          <View>
            <Accounts data={accounts} />
            <Divider />
          </View>
        </Spacer>
      </View>
      <VStack padding={20} justifyContent="space-between">
        <Spacer>
          <View>
            <Spacer>
              <Text>Recipient details</Text>
              <List.Item title="Remy Data" description="DSTV | 1234567" />
              <Divider />
              <View>
                <Spacer>
                  {/* TODO: Picker */}
                  <TextInput placeholder="Enter amount" />
                </Spacer>
              </View>
            </Spacer>
          </View>
          <View>
            <Spacer gap={10}>
              <Caption>
                This payment will be approved by 2 more people before it is sent
                out
              </Caption>
              <Button>Initiate payment</Button>
            </Spacer>
          </View>
        </Spacer>
      </VStack>

      <TransactionSheet
        onConfirm={() => {}}
        onDismiss={() => {}}
        title="Confirm transfer"
        visible={openTransaction}
        caption="This payment will warrant a charge of #2,000"
        description="Transfer #2,000,000 to 78 employees in total?"
      />

      <AuthorizeTransaction visible={openAuthorization} />

      <TransactionDoneSheet visible={openDone} title="" description="" />
    </ScrollView>
  );
}
