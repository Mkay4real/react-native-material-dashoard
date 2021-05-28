import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {HStack, Button, Spacer} from '../../exports';
import Screen from '../../shared/components/Screen';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Colors, Text, Headline, Paragraph, useTheme} from 'react-native-paper';

const Description = ({
  style,
  label,
  children,
}: {
  label: string;
  children: string;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <Text style={[style, styles.whiteText]}>
      <Text style={{color: Colors.grey500}}>{label}:</Text>{' '}
      <Text>{children}</Text>
    </Text>
  );
};

export default function Main() {
  const nav = useNavigation();

  const {
    // @ts-ignore
    colors: {primaryDark},
  } = useTheme();

  return (
    <View style={[styles.screen, {backgroundColor: primaryDark}]}>
      <Spacer gap={30}>
        <View>
          <Spacer>
            <Headline style={styles.whiteText}>Now let us add staffs</Headline>
            <Paragraph style={{color: Colors.grey400}}>
              Your staffs will be able to log into the platform and initiate or
              authorize transactions.
            </Paragraph>
          </Spacer>
        </View>
        <View>
          <Spacer gap={20}>
            <Description label="Initiators">
              Can initiate a transaction
            </Description>

            <Description label="Authorizers">
              Can view and approve transactions on the system
            </Description>
          </Spacer>
        </View>
        <Button mode="contained" onPress={() => nav.navigate('Credentials')}>
          Next
        </Button>
      </Spacer>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
  whiteText: {
    color: 'white',
  },
  secBtn: {
    backgroundColor: '#4F4E5E',
  },
});
