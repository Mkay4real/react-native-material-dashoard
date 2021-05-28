import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Colors, Divider, Subheading, Title} from 'react-native-paper';
import TransferIcon from '../../../../assets/transfer.svg';
import {Button, Spacer} from '../../../../exports';
import HStack from '../../../../shared/components/HStack';
import ScrollableDefaultScreen from '../../../../shared/components/ScrollableDefaultScreen';
import SearchInput from '../../components/SearchInput';
import TabShell from '../../components/TabShell';

const PayBillButton = () => {
  const nav = useNavigation();
  return (
    <Button
      onPress={() => {
        nav.navigate('BillPayment');
      }}>
      Pay for a new bill
    </Button>
  );
};

const EmptyState = () => {
  return (
    <View style={styles.emptyState}>
      <Spacer gap={20}>
        <TransferIcon width={56} height={56} color="#42526E" />
        <View>
          <Title>Pay your first bill</Title>
          <Subheading>
            Pay your bills such as utitlity, cable subsriptions etc
          </Subheading>
        </View>
        <PayBillButton />
      </Spacer>
    </View>
  );
};

const data = new Array(5).fill(0).map(() => {
  return {
    title: 'DStv',
    type: 'TV subscription',
    description: 'Ife Dada | DStv Premium',
  };
});

function Bills() {
  return (
    <ScrollableDefaultScreen
      action={{label: 'Pay for a new bill', onPress: () => {}}}>
      <Spacer>
        <SearchInput />

        <FlatList
          data={data}
          ItemSeparatorComponent={Divider}
          renderItem={({item: {type, title, description}}) => {
            return (
              <View style={{padding: 10}}>
                <Title>{title}</Title>
                <HStack alignItems="center" justifyContent="space-between">
                  <Subheading style={{color: Colors.grey600}}>
                    {description}
                  </Subheading>
                  <Subheading style={{color: Colors.grey600}}>
                    {type}
                  </Subheading>
                </HStack>
              </View>
            );
          }}
        />
      </Spacer>
    </ScrollableDefaultScreen>
  );

  return (
    <TabShell
      data={data}
      fallback={EmptyState}
      action={<PayBillButton />}
      ItemSeparatorComponent={Divider}
      renderItem={({item: {type, title, description}}) => {
        return (
          <View style={{padding: 20}}>
            <Title>{title}</Title>
            <HStack alignItems="center" justifyContent="space-between">
              <Subheading style={{color: Colors.grey600}}>
                {description}
              </Subheading>
              <Subheading style={{color: Colors.grey600}}>{type}</Subheading>
            </HStack>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  emptyState: {
    padding: 20,
    opacity: 0.2,
    borderRadius: 8,
    backgroundColor: '#CBC9FF',
  },
});

export default Bills;
