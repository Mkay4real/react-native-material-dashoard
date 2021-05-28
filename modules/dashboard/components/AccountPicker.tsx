import React from 'react';
import {FlatList, StyleProp, View, ViewStyle} from 'react-native';
import {Caption, Divider, Subheading, Title} from 'react-native-paper';
import {HStack} from '../../../exports';

import { useForm } from '../../../form';
import { TextInput, FieldWrapper } from '../../../exports';
import { Picker } from '@react-native-picker/picker';

export type Account = {
  accountName: string;
  accountNumber: string;
  bankName: string;
  bankCode: string;
  balance: string;
  other: any;
};

type AccountPickerProps = {
  currencies?: [];
  onClick(): void;
  onAccountSelected(account?: Account): void;
  allowDebit?: boolean;
  allowCredit?: boolean;
  exclude?: [];
  selectedAccount?: Account;
  selectable?: boolean;

};

 function Accounts({
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

export default function AccountPicker ({ selectedAccount, ...props }: AccountPickerProps){
  const accounts = [
    {
      balance: '15,000,000',
      accountName: 'XYZ Corporate',
      accountNumber: '2346123400',
    },
    {
      balance: '800,000',
      accountName: 'XYZ Current',
      accountNumber: '2346123401',
    },
    {
      balance: '10,000',
      accountName: 'XYZ Savings',
      accountNumber: '2346123402',
    },
  ] as Array<Account>;

  const [selected, setSelected] = React.useState(selectedAccount);

  return (
    <FieldWrapper>
      <Picker
        selectedValue={selected?.accountNumber || selectedAccount?.accountNumber}
        onValueChange={(val) => {
          const acc = accounts.find(item => item.accountNumber == val);
          setSelected(acc as Account);
          props.onAccountSelected(acc as Account);
        }}>
        <Picker.Item
          value={undefined}
          label="Select Account Number"
        />

        {accounts.map(({ accountName, accountNumber }) => {
          // {(_businessTypes || []).map(({label,value}) => {
          return <Picker.Item label={(`${accountName} (${accountNumber})`)} value={accountNumber} />;

        })}
      </Picker>
    </FieldWrapper>

  )
};
