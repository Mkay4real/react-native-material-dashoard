import React from 'react';
import {FlatList, StyleProp, View, ViewStyle} from 'react-native';
import {
  Colors,
  Divider,
  Subheading,
  Title,
  TouchableRipple,
} from 'react-native-paper';
import HStack from '../../../shared/components/HStack';
import {EmployeeDetailsDTO} from '../dto/employee.dto';

export default function EmployeeList({
  data,
  style,
  onItemPress,
  showSalary = false,
}: {
  showSalary?: boolean;
  data: EmployeeDetailsDTO[];
  style?: StyleProp<ViewStyle>;
  onItemPress?: (item: EmployeeDetailsDTO) => void;
}) {
  return (
    <FlatList
      data={data}
      style={style}
      ItemSeparatorComponent={Divider}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => {
        const {bank, salary, firstName, lastName, accountNumber} = item;

        return (
          <TouchableRipple onPress={() => onItemPress?.(item)}>
            <HStack
              padding={20}
              alignItems="center"
              justifyContent="space-between">
              <View>
                <Title>
                  {firstName} {lastName}
                </Title>
                <Subheading style={{color: Colors.grey600}}>
                  {bank} | {accountNumber}
                </Subheading>
              </View>
              {showSalary && (
                <Subheading style={{marginStart: 20}}>{salary}</Subheading>
              )}
            </HStack>
          </TouchableRipple>
        );
      }}
    />
  );
}
