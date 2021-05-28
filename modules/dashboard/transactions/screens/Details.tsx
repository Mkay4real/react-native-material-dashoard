import {useNavigation} from '@react-navigation/native';
import React, {createRef, useCallback, useEffect, useLayoutEffect} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {Subheading, Text, Title} from 'react-native-paper';
import {Button, HStack, Spacer, TextInput} from '../../../../exports';
import VStack from '../../../../shared/components/VStack';
import ActionSheet from 'react-native-actions-sheet';

import {useForm} from '../../../../form';

import ChevronDown from '../../../../assets/chevron-down.svg';
import RadioDot from '../../../../shared/components/RadioDot';

export default function Details() {
  const nav = useNavigation();
  const actionSheetRef = createRef<any>();

  const {values, submit, handlers} = useForm({
    schema: {
      to: 'string',
      from: 'string',
      amount: 'number',
      accountOrName: 'string',
      type: {
        initialValue: 'all',
      },
    },
    onSubmit() {
      return Promise.resolve();
    },
  });

  const close = useCallback(() => {
    actionSheetRef.current?.setModalVisible(false);
  }, [actionSheetRef]);

  const Filter = () => {
    return (
      <Button
        onPress={() => {
          actionSheetRef.current?.setModalVisible(true);
        }}>
        <HStack alignItems="center">
          <Text style={{color: '#42526E', marginEnd: 10}}>Filters</Text>
          <ChevronDown width={8} height={8} color="#42526E" />
        </HStack>
      </Button>
    );
  };

  useLayoutEffect(() => {
    nav.setOptions({
      headerRight: () => <Filter />,
    });
  }, [nav]);

  return (
    <>
      <VStack flex={1} padding={20} justifyContent="space-between">
        <Spacer>
          <FlatList data={[]} renderItem={() => <View />} />
          <Button type="secondary">Share</Button>
        </Spacer>
      </VStack>

      <ActionSheet gestureEnabled ref={actionSheetRef} onClose={close}>
        <VStack paddingHorizontal={10} paddingVertical={20}>
          <Spacer gap={20}>
            <Title>Filters</Title>

            <View>
              <Spacer gap={30}>
                <TextInput
                  label="Search by account or name"
                  onChangeText={handlers.accountOrName.onChange}
                  value={values.accountOrName as string | undefined}
                />

                <TextInput
                  label="Search by amount"
                  onChangeText={handlers.amount.onChange}
                  value={values.amount as string | undefined}
                />

                <View>
                  <Spacer gap={15}>
                    <Subheading>Date range</Subheading>
                    <HStack>
                      <Spacer>
                        <TextInput
                          label="From"
                          onChangeText={handlers.from.onChange}
                          value={values.from as string | undefined}
                        />

                        <TextInput
                          label="To"
                          onChangeText={handlers.to.onChange}
                          value={values.to as string | undefined}
                        />
                      </Spacer>
                    </HStack>
                  </Spacer>
                </View>

                <HStack>
                  <FlatList
                    data={[
                      {label: 'All', value: 'all'},
                      {label: 'Credit', value: 'credit'},
                      {label: 'Debit', value: 'debit'},
                    ]}
                    ItemSeparatorComponent={() => <View style={{width: 30}} />}
                    renderItem={({item: {label, value}}) => {
                      const onPress = () => {
                        handlers.type.onChange(value);
                      };

                      return (
                        <RadioDot
                          label={label}
                          onPress={onPress}
                          checked={values.type === value}
                        />
                      );
                    }}
                  />
                </HStack>
              </Spacer>
            </View>

            <Button onPress={submit}>Search</Button>
          </Spacer>
        </VStack>
      </ActionSheet>
    </>
  );
}
