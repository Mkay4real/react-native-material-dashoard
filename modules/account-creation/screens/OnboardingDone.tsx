import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Colors, Headline, Subheading, Text, useTheme} from 'react-native-paper';
import Check from '../../../assets/success.svg';
import DefaultScreen from '../../../shared/components/DefaultScreen';
import Spacer from '../../../shared/components/Spacer';
import VStack from '../../../shared/components/VStack';

export default function OnboardingDone() {
  const {colors} = useTheme();
  const nav = useNavigation();

  const {
    params: {accountNumber},
  } = useRoute<any>();

  return (
    <DefaultScreen
      style={styles.screen}
      action={{
        label: 'Proceed to corporate profiling',
        onPress: () => nav.navigate('CorporateProfiling'),
      }}>
      <VStack padding={10} alignItems="center" alignSelf="center">
        <VStack alignItems="center">
          <Spacer gap={20}>
            <Check width={50} height={50} color={Colors.green500} />
            <VStack alignItems="center">
              <Spacer>
                <Headline>Congrats</Headline>
                <Subheading
                  style={{textAlign: 'center', color: Colors.grey600}}>
                  You have completed your account creation process. Below are
                  your account details
                </Subheading>
              </Spacer>
            </VStack>
          </Spacer>
        </VStack>
        <VStack alignItems="center" style={styles.gapTop}>
          <Spacer gap={10}>
            <Subheading>Your account details</Subheading>
            <Text style={[styles.accNumber, {color: colors.primary}]}>
              {accountNumber}
            </Text>
            <Headline>Brandson and sons limited</Headline>
          </Spacer>
        </VStack>
      </VStack>
    </DefaultScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    justifyContent: 'space-between',
  },
  accNumber: {
    fontSize: 40,
    fontWeight: '600',
  },
  gapTop: {
    marginTop: 50,
  },
});
