import {useNavigation, useRoute} from '@react-navigation/native';
import React, {createRef, useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  Colors,
  Divider,
  Headline,
  Subheading,
  Text,
  Title,
  useTheme,
} from 'react-native-paper';
import Button from '../../../../shared/components/Button';
import HStack from '../../../../shared/components/HStack';
import Spacer from '../../../../shared/components/Spacer';
import VStack from '../../../../shared/components/VStack';
import {noCase, capitalCase} from 'change-case';
import {EmployeeDetailsDTO} from '../../dto/employee.dto';
import ActionSheet from 'react-native-actions-sheet';
import Check from '../../../../assets/check-circle.svg';
import Notification from '../../../../shared/components/Notification';

export default function EmployeeDetails() {
  const nav = useNavigation();
  const {params = {}} = useRoute();
  const actionSheetRef = createRef<any>();
  const [deleteDone, setDeleteDone] = useState(false);

  const [showDelete, setShowDelete] = useState(false);

  const {
    colors: {primary},
  } = useTheme();

  const employee = (params as any).employee as EmployeeDetailsDTO;

  const onDismiss = useCallback(() => {
    setShowDelete(false);
  }, []);

  useEffect(() => {
    actionSheetRef.current?.setModalVisible(showDelete);
  }, [showDelete]);

  useEffect(() => {
    if (deleteDone) {
      setShowDelete(false);

      setTimeout(() => {
        nav.navigate('Employees');
      }, 1000);
    }
  }, [deleteDone]);

  return (
    <VStack flex={1} padding={20} justifyContent="space-between">
      <FlatList
        keyExtractor={(item) => item}
        ItemSeparatorComponent={Divider}
        data={Object.keys(employee).filter((key) => key !== 'id')}
        renderItem={({item}) => {
          return (
            <HStack padding={10} justifyContent="space-between">
              <Text>{capitalCase(noCase(item))}</Text>
              <Title>{employee[item as keyof EmployeeDetailsDTO]}</Title>
            </HStack>
          );
        }}
      />
      <View>
        <Spacer gap={15}>
          <Button
            style={styles.button}
            labelStyle={{color: primary}}
            onPress={() => {
              nav.navigate('AddEmployee', {employee, type: 'update'});
            }}>
            Edit employee details
          </Button>

          <Button
            style={styles.button}
            labelStyle={{color: Colors.red600}}
            onPress={() => setShowDelete(true)}>
            Delete employee
          </Button>
        </Spacer>
      </View>

      <ActionSheet
        gestureEnabled
        onClose={onDismiss}
        ref={actionSheetRef}
        containerStyle={{flex: 1}}>
        <VStack flex={1} padding={20} justifyContent="space-between">
          <Spacer gap={30}>
            <View>
              <Headline>Delete employee?</Headline>
              <Subheading style={{color: Colors.grey600}}>
                You are about to delete {employee.firstName} {employee.lastName}
                's details
              </Subheading>
            </View>

            <View>
              <Spacer>
                <Button
                  onPress={() => {
                    setDeleteDone(true);
                  }}>
                  Yes, Delete
                </Button>
                <Button type="secondary" onPress={onDismiss}>
                  Cancel
                </Button>
              </Spacer>
            </View>
          </Spacer>
        </VStack>
      </ActionSheet>

      {deleteDone && (
        <View style={styles.notification}>
          <Notification status="success" icon={Check} message="Changes saved" />
        </View>
      )}
    </VStack>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.grey300,
  },
  notification: {
    left: 0,
    right: 0,
    bottom: 0,
    padding: 10,
    position: 'absolute',
  },
});
