import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Colors,
  Divider,
  Headline,
  Subheading,
  Text,
  useTheme,
} from 'react-native-paper';
import Check from '../../../assets/success.svg';
import DefaultScreen from '../../../shared/components/DefaultScreen';
import Spacer from '../../../shared/components/Spacer';
import VStack from '../../../shared/components/VStack';

export default function OnboardingDone() {
  const nav = useNavigation();

  const {
    colors: {primary},
  } = useTheme();

  return (
    <DefaultScreen
      style={styles.screen}
      action={{
        label: 'Proceed to Dashboard',
        onPress: () => nav.navigate('Dashboard'),
      }}>
      <Spacer gap={60}>
        <VStack alignItems="center">
          <Spacer gap={30}>
            <Check width={50} height={50} color="#00875A" />
            <VStack alignItems="center">
              <Spacer>
                <Headline>Congrats</Headline>
                <Subheading style={styles.textCenter}>
                  You have completed your corporate account profiling process.
                  Below are your account details
                </Subheading>
              </Spacer>
            </VStack>
          </Spacer>
        </VStack>
        <View>
          <Spacer gap={24}>
            <View>
              <Spacer gap={16}>
                <Subheading style={styles.textCenter}>
                  Your account details
                </Subheading>
                <Text
                  style={[
                    styles.accNumber,
                    styles.textCenter,
                    {color: primary},
                  ]}>
                  68392
                </Text>
                <Headline style={styles.textCenter}>Brandson limited</Headline>
              </Spacer>
            </View>
            <Divider />
            <Subheading style={styles.textCenter}>Your username</Subheading>
          </Spacer>
          <View style={styles.username}>
            <Subheading style={{color: primary}}>BabaThunder01</Subheading>
          </View>
        </View>
      </Spacer>
    </DefaultScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCenter: {
    textAlign: 'center',
    color: Colors.grey600,
  },
  accNumber: {
    fontSize: 40,
  },
  username: {
    width: '100%',
    marginTop: 20,
    borderRadius: 3,
    paddingVertical: 15,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(204, 204, 216, 0.3)',
  },
});
