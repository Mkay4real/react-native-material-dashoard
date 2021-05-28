import React, {
  useMemo,
  createRef,
  useEffect,
  useCallback,
  useState,
} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from '../../../../exports';
import VStack from '../../../../shared/components/VStack';
import {employees} from '../../../../shared/utils/dummy_data';
import EmployeeList from '../../components/EmployeeList';
import ActionSheet from 'react-native-actions-sheet';
import {Subheading, Title, TouchableRipple} from 'react-native-paper';
import Spacer from '../../../../shared/components/Spacer';
import {useNavigation} from '@react-navigation/native';

export default function Employees() {
  const nav = useNavigation();
  const [show, setShow] = useState(false);
  const actionSheetRef = createRef<any>();

  const addEmployee = useCallback(() => {
    setShow(true);
  }, [show]);

  const onDismiss = useCallback(() => {
    setShow(false);
  }, [show]);

  useEffect(() => {
    actionSheetRef.current?.setModalVisible(show);
  }, [show]);

  return (
    <VStack flex={1} justifyContent="space-between">
      <View style={{padding: 10}}>
        <EmployeeList
          data={employees}
          onItemPress={({id}) => {
            const employee = employees.find((emp) => emp.id === id);
            nav.navigate('EmployeeDetails', {employee});
          }}
        />
      </View>
      <View style={styles.button}>
        <Button onPress={addEmployee}>Add new employee</Button>
      </View>
      <ActionSheet gestureEnabled onClose={onDismiss} ref={actionSheetRef}>
        <VStack style={styles.sheet}>
          <Spacer gap={30}>
            <TouchableRipple
              onPress={() => {
                setShow(false);
                nav.navigate('AddEmployee');
              }}>
              <View
                style={{
                  borderRadius: 8,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  backgroundColor: 'rgba(204, 204, 216, 0.5)',
                }}>
                <Title>Add employee manually</Title>
                <Subheading style={{color: '#58697D'}}>
                  Manually enter single employees
                </Subheading>
              </View>
            </TouchableRipple>

            <Button onPress={onDismiss}>Cancel</Button>
          </Spacer>
        </VStack>
      </ActionSheet>
    </VStack>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 20,
    borderWidth: 1,
    backgroundColor: '#FAFAFF',
    borderColor: 'rgba(204, 204, 216, 0.5)',
  },
  sheet: {
    padding: 20,
    justifyContent: 'space-between',
  },
});
