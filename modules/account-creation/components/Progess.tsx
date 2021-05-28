import React, {ReactElement} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {Colors, Subheading, Title} from 'react-native-paper';
import HStack from '../../../shared/components/HStack';
import Spacer from '../../../shared/components/Spacer';
import VStack from '../../../shared/components/VStack';

type Progess = {
  title: string;
  subtitle: string;
  trailing?: ReactElement;
  style?: StyleProp<ViewStyle>;
};

export default function Progess({style, title, subtitle, trailing}: Progess) {
  return (
    <HStack
      borderRadius={8}
      alignItems="center"
      justifyContent="space-between"
      style={[style, styles.container]}>
      <Spacer horizontal>
        <VStack>
          <Title>{title}</Title>
          <Subheading style={{color: Colors.grey600}}>{subtitle}</Subheading>
        </VStack>
        {trailing}
      </Spacer>
    </HStack>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#DFE1E6',
    backgroundColor: 'rgba(240, 239, 255, 0.5)',
  },
});
