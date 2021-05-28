import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Card,
  Colors,
  IconButton,
  Paragraph,
  Subheading,
  Title,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import ChevronRight from '../../../assets/chevron-right.svg';
import Mail from '../../../assets/mail.svg';
import Phone from '../../../assets/phone.svg';
import {Button} from '../../../exports';
import HStack from '../../../shared/components/HStack';
import Screen from '../../../shared/components/Screen';
import Spacer from '../../../shared/components/Spacer';
import AccountCard from '../../../shared/components/AccountCard';

export default function AccountDetails() {
  const {
    colors: {primary, primaryDark},
  } = useTheme();

  const nav = useNavigation();

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={{padding: 20}}>
        <Spacer gap={40}>
          <View>
            <Spacer gap={30}>
              <AccountCard
                color={primary}
                balance="5,000,000"
                accountName="Acc name"
                accountNumber="123456"
              />
              <HStack justifyContent="space-between">
                <View>
                  <Paragraph>Account type</Paragraph>
                  <Title>Corporate P2</Title>
                </View>
                <View>
                  <Paragraph>Open date</Paragraph>
                  <Title>3 Oct, 2020</Title>
                </View>
              </HStack>
              <View>
                <Spacer gap={20}>
                  <View>
                    <Paragraph>Account manager</Paragraph>
                    <HStack
                      alignItems="flex-start"
                      justifyContent="space-between">
                      <View>
                        <Title>John Davidson</Title>
                        <Paragraph>+234 9056 789 67</Paragraph>
                        <Paragraph>johndavidson@email.com</Paragraph>
                      </View>
                      <HStack>
                        <Spacer gap={25} horizontal>
                          <View
                            style={[styles.icon, {backgroundColor: primary}]}>
                            <IconButton
                              color="white"
                              icon={(props) => <Phone {...props} />}
                            />
                          </View>
                          <View
                            style={[styles.icon, {backgroundColor: primary}]}>
                            <IconButton
                              color="white"
                              icon={(props) => <Mail {...props} />}
                            />
                          </View>
                        </Spacer>
                      </HStack>
                    </HStack>
                  </View>
                  <View style={styles.btn}>
                    <TouchableRipple>
                      <View style={styles.btnContainer}>
                        <Subheading style={{color: primary}}>
                          View Transactions
                        </Subheading>
                        <ChevronRight color={primary} width={25} height={25} />
                      </View>
                    </TouchableRipple>
                  </View>
                </Spacer>
              </View>
            </Spacer>
          </View>
          <Card style={[styles.card, {backgroundColor: primaryDark}]}>
            <Card.Title
              title="Request account services"
              titleStyle={{color: Colors.white}}
            />
            <Card.Content>
              <Subheading style={styles.cardSubTitle}>
                You can request for account service such as checkbook etc.
              </Subheading>
            </Card.Content>
            <Card.Actions>
              <Button
                labelStyle={{color: primary}}
                style={{backgroundColor: 'white'}}
                onPress={() => nav.navigate('AccountServices')}>
                Request services
              </Button>
            </Card.Actions>
          </Card>
        </Spacer>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 0,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  icon: {
    borderRadius: 100,
  },
  btn: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#F5F6F7',
    borderColor: Colors.grey300,
  },
  btnContainer: {
    paddingVertical: 15,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  card: {
    padding: 10,
    borderRadius: 8,
  },
  cardSubTitle: {
    fontSize: 17,
    marginBottom: 10,
    color: Colors.grey200,
  },
});
