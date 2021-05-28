import React from 'react';
import {StyleSheet} from 'react-native';
import {Colors, Subheading, Title} from 'react-native-paper';
import Check from '../../../assets/check-circle.svg';
import Button from '../../../shared/components/Button';
import Screen from '../../../shared/components/Screen';
import Spacer from '../../../shared/components/Spacer';
import VStack from '../../../shared/components/VStack';
import { useNavigation } from '@react-navigation/native';

export default function PasswordSet() {

  const nav = useNavigation();

  return (
    <Screen style={styles.screen}>
      <VStack alignItems="center">
        <Spacer gap={40}>
          <Check width={100} height={100} color={Colors.green300} />
          <VStack alignItems="center">
            <Spacer>
              <Title>New password set</Title>
              <Subheading style={styles.subheading}>
                You have successfully created your new password
              </Subheading>
            </Spacer>
          </VStack>
          <Button onPress={()=>nav.navigate('Login')} mode="contained">Proceed to login</Button>
        </Spacer>
      </VStack>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
  },
  subheading: {
    textAlign: 'center',
  },
});
