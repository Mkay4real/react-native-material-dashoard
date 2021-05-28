import React, {ComponentProps} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {Card, Subheading, Text, useTheme} from 'react-native-paper';
import Ring from '../../assets/ring.svg';

type AccountCard = {
  color?: string;
  balance: string;
  accountName: string;
  accountNumber: string;
  style?: StyleProp<ViewStyle>;
  onPress?: ComponentProps<typeof Card>['onPress'];
};

export default function AccountCard({
  color,
  style,
  onPress,
  balance,
  accountName,
  accountNumber,
}: AccountCard) {
  const {
    colors: {primaryDark},
  } = useTheme();

  if (!color) color = primaryDark;

  return (
    <Card
      elevation={2}
      onPress={onPress}
      style={[styles.card, {backgroundColor: color}, style]}>
      <Ring style={styles.ring} />
      <Card.Title title={balance} titleStyle={styles.white} />
      <Card.Content style={styles.content}>
        <Subheading style={styles.white}>{accountName}</Subheading>
        <Text style={styles.accNumber}>{accountNumber}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    paddingVertical: 20,
    paddingHorizontal: 10,
    // backgroundColor: '#272393',
  },
  white: {
    color: 'white',
  },
  accNumber: {
    color: 'rgba(255, 255, 255, 0.6)',
  },
  content: {
    marginTop: 25,
    justifyContent: 'flex-end',
  },
  ring: {
    left: -20,
    top: -20,
    width: 150,
    height: 150,
    position: 'absolute',
  },
});
