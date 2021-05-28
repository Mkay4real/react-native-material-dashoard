import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Headline, Subheading} from 'react-native-paper';
import Button from '../../../shared/components/Button';
import Screen from '../../../shared/components/Screen';
import Spacer from '../../../shared/components/Spacer';
import VStack from '../../../shared/components/VStack';

export default function Intro() {
  const nav = useNavigation();

  return (
    <Screen style={styles.screen}>
      <VStack>
        <Spacer gap={50}>
          <VStack alignItems="center">
            <Spacer gap={20}>
              <Headline>Forgot password?</Headline>
              <Subheading style={{textAlign: 'center'}}>
                Confirm you forgot your Password to get a recovery code SMS
                on your phone or email
              </Subheading>
            </Spacer>
          </VStack>
          <View>
            <Spacer>
              <Button mode="contained" onPress={() => nav.navigate('RequestOtp')}>
                Yes, I forgot my password
              </Button>
              <Button mode="contained" onPress={() => nav.goBack()}>I remember my password, don't mind me</Button>
            </Spacer>
          </View>
        </Spacer>
      </VStack>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
