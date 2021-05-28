import {useNavigation} from '@react-navigation/native';
import React, {useMemo, useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {Subheading, Text, useTheme} from 'react-native-paper';
import DefaultScreen from '../../../shared/components/DefaultScreen';
import HStack from '../../../shared/components/HStack';
import VStack from '../../../shared/components/VStack';

import {useForm} from '../../../form';
import Spacer from '../../../shared/components/Spacer';
import ErrorLabel from '../../../shared/components/ErrorLabel';
import { createAccountNumber } from '../services/api';
import { notify } from '../../../shared/utils/utils';

const CELL_COUNT = 5;

const subtitle =
  'You should choose your desired account number, only the first and last digits are automatically generated';

export default function AccountNumber() {
  const {colors} = useTheme();
  const nav = useNavigation();

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const accountNumber = useMemo(() => `3${value}0`, [value]);

  const getAccountNumber = (val: string)=> `3${val}0`;

  const {errors, submit, data, error, isSubmitting, submitted, onChange} = useForm({
    schema: {
      accountNumber: {
        required: true,
        validate(val) {
          if (!val) { 
            return 'You must select an account number to proceed';
          }
          else if (String(val).length<CELL_COUNT) { 
            return 'Invalid account number length';
          }
        },
      },
    },
  onSubmit({accountNumber}) {
    return createAccountNumber(getAccountNumber(accountNumber as string));
  },
});

  useEffect(() => {
    if (submitted) {
      if (data) {
        notify({message: data?.responseMessage})
        if(data.responseCode == "00"){
          nav.navigate('OnboardingDone', {accountNumber});
        }
      } else {
        notify({title: "Error", message: (error as any)?.response?.data?.responseMessage})
        console.log('response error', (error as any)?.response?.data);
      }

      // nav.navigate('OnboardingDone', {accountNumber});
    }
  }, [nav, submitted, accountNumber]);

  useEffect(() => {
    onChange('accountNumber', value);
  }, [value, onChange]);

  return (
    <DefaultScreen
      decorate={true}
      subtitle={subtitle}
      style={styles.screen}
      title="Choose account number"
      action={{
        onPress: submit,
        label: 'Continue',
        loading: isSubmitting,
      }}>
      <VStack>
        <Spacer>
          <HStack alignItems="center" justifyContent="center">
            <Text style={styles.digit}>3</Text>
            <CodeField
              ref={ref}
              {...props}
              value={value}
              cellCount={CELL_COUNT}
              onChangeText={setValue}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              rootStyle={styles.codeFieldRoot}
              renderCell={({index, symbol, isFocused}) => (
                <Text
                  key={index}
                  onLayout={getCellOnLayoutHandler(index)}
                  style={[styles.cell, isFocused && styles.focusCell]}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
            <Text style={styles.digit}>0</Text>
          </HStack>
          {errors.has('accountNumber') && (
            <ErrorLabel message={errors.get('accountNumber') as string} />
          )}
        </Spacer>
      </VStack>
      <VStack marginTop={50} alignItems="center">
        <Subheading>Your account number will be</Subheading>
        <View style={styles.preview}>
          <Text style={[styles.accNumber, {color: colors.primary}]}>
            {accountNumber}
          </Text>
        </View>
      </VStack>
    </DefaultScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'space-between',
  },
  preview: {
    padding: 20,
    width: '100%',
    marginTop: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(204, 204, 216, 0.5)',
  },
  accNumber: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  digit: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  codeFieldRoot: {
    width: '80%',
    marginHorizontal: 10,
  },
  cell: {
    flex: 1,
    fontSize: 24,
    lineHeight: 38,
    textAlign: 'center',
    borderBottomWidth: 2,
    marginHorizontal: 10,
    borderBottomColor: '#000',
  },
  focusCell: {
    borderColor: '#000',
  },
});
