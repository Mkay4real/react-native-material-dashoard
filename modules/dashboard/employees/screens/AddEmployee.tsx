import {Picker} from '@react-native-picker/picker';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton, Paragraph, Subheading, Title} from 'react-native-paper';
import {Spacer, TextInput} from '../../../../exports';
import {useForm} from '../../../../form';
import FieldWrapper from '../../../../shared/components/FieldWrapper';
import HStack from '../../../../shared/components/HStack';
import Notification from '../../../../shared/components/Notification';
import ScrollableDefaultScreen from '../../../../shared/components/ScrollableDefaultScreen';
import {EmployeeDetailsDTO} from '../../dto/employee.dto';
import {create, update} from '../services/employees';

import Close from '../../../../assets/close.svg';
import Check from '../../../../assets/check-circle.svg';
import ErrorLabel from '../../../../shared/components/ErrorLabel';

const _banks = [
  {value: undefined, label: 'Bank'},
  {value: 'uba', label: 'UBA'},
];

export default function AddEmployee() {
  const nav = useNavigation();
  const {params = {}} = useRoute();

  const {type} = params as any;

  const isUpdate = type === 'update';

  const employee = ((params as any).employee as EmployeeDetailsDTO) ?? {};

  const {
    values,
    submit,
    errors,
    submitted,
    clearValues,
    isSubmitting,
    handlers,
  } = useForm<Omit<EmployeeDetailsDTO, 'id'>>({
    schema: {
      firstName: {
        required: true,
        initialValue: employee.firstName,
      },
      lastName: {
        required: true,
        initialValue: employee.lastName,
      },
      salary: {
        required: true,
        initialValue: employee.salary,
      },
      accountNumber: {
        required: true,
        initialValue: employee.accountNumber,
      },
      bank: {
        required: true,
        initialValue: employee.bank,
      },
    },
    onSubmit(values) {
      const employee = values as EmployeeDetailsDTO;
      return isUpdate ? update(employee.id, employee) : create(employee);
    },
  });

  useEffect(() => {
    if (isUpdate) {
      nav.setOptions({title: 'Edit employee details'});
    }
  }, [isUpdate]);

  useEffect(() => {
    if (submitted) {
      setTimeout(() => {
        nav.navigate('Employees');
      }, 1000);
    }
  }, [submitted]);

  const bankAndAccountNumber = [values.bank, values.accountNumber]
    .filter(Boolean)
    .join(' | ');

  return (
    <>
      <ScrollableDefaultScreen
        action={{
          onPress: submit,
          loading: isSubmitting,
          label: isUpdate ? 'Save changes' : 'Add new employee',
        }}>
        <View>
          <Spacer gap={30}>
            <View>
              <Spacer gap={30}>
                <TextInput
                  placeholder="First name"
                  value={values.firstName}
                  error={errors.has('firstName')}
                  errorMessage={errors.get('firstName')}
                  onChangeText={handlers.firstName.onChange}
                />

                <TextInput
                  placeholder="Last name"
                  value={values.lastName}
                  error={errors.has('lastName')}
                  errorMessage={errors.get('lastName')}
                  onChangeText={handlers.lastName.onChange}
                />

                <TextInput
                  value={values.salary}
                  placeholder="Salary amount"
                  error={errors.has('salary')}
                  errorMessage={errors.get('salary')}
                  onChangeText={handlers.salary.onChange}
                />

                <TextInput
                  keyboardType="number-pad"
                  placeholder="Account number"
                  value={values.accountNumber}
                  error={errors.has('accountNumber')}
                  errorMessage={errors.get('accountNumber')}
                  onChangeText={handlers.accountNumber.onChange}
                />

                <View>
                  <Spacer>
                    <FieldWrapper>
                      <Picker
                        selectedValue={values.bank}
                        onValueChange={(val) => {
                          handlers.bank.onChange(val as string);
                        }}>
                        {_banks.map((type) => {
                          return <Picker.Item {...type} />;
                        })}
                      </Picker>
                    </FieldWrapper>
                    {errors.has('bank') && (
                      <ErrorLabel message={errors.get('bank') as string} />
                    )}
                  </Spacer>
                </View>
              </Spacer>
            </View>

            <View>
              <Spacer>
                <Paragraph>Account Validation</Paragraph>
                {Object.values(values).some(Boolean) && (
                  <HStack alignItems="center" justifyContent="space-between">
                    <Spacer horizontal>
                      <View>
                        <Title>
                          {values.firstName} {values.lastName}
                        </Title>
                        <Subheading>{bankAndAccountNumber}</Subheading>
                      </View>
                      <IconButton
                        size={30}
                        color="#42526E"
                        onPress={clearValues}
                        icon={(props) => (
                          <Close
                            {...props}
                            width={props.size}
                            height={props.size}
                          />
                        )}
                      />
                    </Spacer>
                  </HStack>
                )}
              </Spacer>
            </View>
          </Spacer>
        </View>
      </ScrollableDefaultScreen>
      {submitted && (
        <View style={styles.notification}>
          <Notification icon={Check} status="success" message="Changes saved" />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  notification: {
    left: 0,
    right: 0,
    bottom: 0,
    padding: 10,
    position: 'absolute',
  },
});
