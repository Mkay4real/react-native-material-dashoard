import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {
  Colors,
  Divider,
  Subheading,
  Title,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import {Button, Spacer} from '../../../../exports';
import HStack from '../../../../shared/components/HStack';
import ChevronRight from '../../../../assets/chevron-right.svg';
import TransferIcon from '../../../../assets/transfer.svg';
import SearchInput from '../../components/SearchInput';

const EmptyState = () => {
  return (
    <View style={styles.emptyState}>
      <Spacer gap={20}>
        <TransferIcon width={56} height={56} color="#42526E" />
        <View>
          <Title>No employees added</Title>
          <Subheading>
            You can pay your salaries and more when you add your employees
          </Subheading>
        </View>
        <Button>Add employees</Button>
      </Spacer>
    </View>
  );
};

const data = new Array(5).fill(0).map(() => {
  return {
    title: 'Benjamin Mendy',
    description: 'keystone bank | 123456',
  };
});

function Employees() {
  const {
    colors: {primaryDark},
  } = useTheme();

  const nav = useNavigation();

  return (
    <ScrollView>
      <View style={{padding: 20}}>
        <Spacer gap={25}>
          <SearchInput />
          <TouchableRipple
            onPress={() => nav.navigate('Salaries')}
            style={[styles.action, {backgroundColor: primaryDark}]}>
            <HStack alignItems="center" justifyContent="space-between">
              <View style={{flex: 1}}>
                <Title style={{color: Colors.white}}>Pay salaries</Title>
                <Subheading style={{color: Colors.grey600}}>
                  Pay #2,000,000 in salaries to all 78 employees
                </Subheading>
              </View>
              <View>
                <TouchableRipple style={{marginLeft: 20}}>
                  <ChevronRight width={30} height={30} color="white" />
                </TouchableRipple>
              </View>
            </HStack>
          </TouchableRipple>
        </Spacer>
      </View>
      <FlatList
        data={data}
        ListEmptyComponent={EmptyState}
        ItemSeparatorComponent={Divider}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  emptyState: {
    padding: 20,
    opacity: 0.2,
    borderRadius: 8,
    backgroundColor: '#CBC9FF',
  },
  action: {
    width: '100%',
    borderRadius: 8,
    paddingVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 20,
  },
});

export default Employees;
