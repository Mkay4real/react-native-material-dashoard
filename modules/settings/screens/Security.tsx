import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Divider,
  Subheading,
  TouchableRipple,
  Switch,
  Caption,
  Colors,
} from 'react-native-paper';
import {Screen} from 'react-native-screens';
import ChevronRightIcon from '../../../assets/chevron-right.svg';
import HStack from '../../../shared/components/HStack';
import Spacer from '../../../shared/components/Spacer';

const Item = ({onPress, children}: {onPress(): void; children: string}) => {
  return (
    <TouchableRipple onPress={onPress}>
      <HStack padding={20} alignItems="center" justifyContent="space-between">
        <Spacer gap={10} horizontal>
          <Subheading>{children}</Subheading>
          <ChevronRightIcon width={25} height={25} color="#58697D" />
        </Spacer>
      </HStack>
    </TouchableRipple>
  );
};

const ItemSwitch = ({
  title,
  value,
  caption,
  description,
  onValueChange,
}: {
  title: string;
  value: boolean;
  caption: string;
  description?: string;
  onValueChange(): void;
}) => {
  return (
    <View style={{padding: 20}}>
      <Spacer>
        <HStack alignItems="center" justifyContent="space-between">
          <Spacer gap={10} horizontal>
            <Subheading>{title}</Subheading>
            <Switch
              value={value}
              style={{flex: 1}}
              thumbColor="white"
              onValueChange={onValueChange}
              trackColor={{true: '#00875A', false: '#ccc'}}
            />
          </Spacer>
        </HStack>

        <View>
          {description && <Subheading>{description}</Subheading>}
          <Caption>{caption}</Caption>
        </View>
      </Spacer>
    </View>
  );
};

export default function Security() {
  const nav = useNavigation();

  return (
    <Screen style={styles.screen}>
      <Item onPress={() => nav.navigate('ChangePassword')}>
        Change password
      </Item>

      <Divider />

      <Item onPress={() => nav.navigate('ChangePin')}>
        Change transaction PIN
      </Item>

      <Divider />

      <ItemSwitch
        value={false}
        title="Fingerprint"
        onValueChange={() => {}}
        description="Login with face ID or fingerprint"
        caption="This app will use the fingerprints saved on this device to log you in."
      />

      <Divider />

      <ItemSwitch
        value={true}
        onValueChange={() => {}}
        title="Complete transactions with face ID or fingerprint"
        caption="This app will use the fingerprints saved on this device to log you in."
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 0,
  },
  item: {
    padding: 15,
  },
});
