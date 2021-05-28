import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Colors, Headline, Paragraph, useTheme} from 'react-native-paper';
import Button from '../../../shared/components/Button';
import Screen from '../../../shared/components/Screen';
import Spacer from '../../../shared/components/Spacer';

import Check from '../../../assets/check-circle.svg';
import HStack from '../../../shared/components/HStack';

const Description = ({
  style,
  children,
}: {
  children: string;
  style?: StyleProp<ViewStyle>;
}) => {
  const {
    colors: {accent},
  } = useTheme();

  return (
    <HStack padding={10} alignItems="center" style={style}>
      <Spacer gap={20} horizontal>
        <Check width={30} height={30} color={accent} />
        <Paragraph style={[styles.whiteText, {flex: 1}]}>{children}</Paragraph>
      </Spacer>
    </HStack>
  );
};

export default function Main() {
  const nav = useNavigation();

  const {
    colors: {primaryDark},
  } = useTheme();

  return (
    <Screen style={[styles.screen, {backgroundColor: primaryDark}]}>
      <Spacer gap={30}>
        <View>
          <Spacer>
            <Headline style={styles.whiteText}>Get started</Headline>
            <Paragraph style={{color: Colors.grey400}}>
              What you can do with corporate ibank
            </Paragraph>
          </Spacer>
        </View>
        <View>
          <Spacer gap={20}>
            <Description>
              Worldwide Funds Transfers: Transfer money from your corporate
              account to anyone within or outside Nigeria.
            </Description>
            <Description>
              Document Management System: Efficient document upload and
              processing
            </Description>
            <Description>
              Fully Featured: Choose your own account, Bulk payment, Loans,
              Online Cheque confirmation, Employee management, Bill payments,
              Account activities monitoring and lots more.
            </Description>
          </Spacer>
        </View>
        <View>
          <Spacer gap={20}>
            <Button mode="contained" onPress={() => nav.navigate('Bvn')}>
              I don't have a parallex account
            </Button>
            {/* <Button
              style={styles.secBtn}
              onPress={() =>
                nav.navigate('Onboarding', {
                  screen: 'Login',
                })
              }>
              I have a parallex account
            </Button> */}
            {/* <Button //onPress={() => nav.navigate('AccountCreation')}
            >
                Complete Shareholder Onboarding
              </Button> */}
            <Button 
            style={styles.secBtn}
            onPress={() => nav.navigate('CorporateProfiling', { 
              screen: 'AccountValidation',
               params: {isSME: true}
            }
            )}>
                SME Corporate Profiling
              </Button>
            <Button onPress={() => nav.navigate('CorporateProfiling',{ screen: 'AccountValidation',
               params: {isSME: false}
            })}>
                Non SME Corporate Profiling
              </Button>
            {/* <Button onPress={() => nav.navigate('NonSMECorporateProfiling',{isSME: false})}>
                Non SME Corporate Profiling
              </Button> */}
          </Spacer>
        </View>
      </Spacer>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'space-evenly',
  },
  whiteText: {
    color: 'white',
  },
  secBtn: {
    backgroundColor: '#4F4E5E',
  },
});
