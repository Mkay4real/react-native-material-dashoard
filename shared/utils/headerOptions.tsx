import {
  HeaderBackButton,
  StackScreenProps,
  StackNavigationOptions,
} from '@react-navigation/stack';
import React from 'react';
import Menu from '../../assets/menu.svg';
import ChevronLeft from '../../assets/chevron-left.svg';
import {DrawerActions} from '@react-navigation/native';

export const mainOptions: StackNavigationOptions = {
  headerShown: false,
};

const defaultOptions: StackNavigationOptions = {
  headerStyle: {
    elevation: 0,
    shadowOpacity: 0,
    shadowOffset: {width: 0, height: 0},
  },
};

export const options: StackNavigationOptions = {
  ...defaultOptions,
  headerTitle: '',
  headerShown: true,
  headerBackTitleVisible: false,
  headerBackImage: ({tintColor}) => (
    <ChevronLeft width={30} height={30} color={tintColor} />
  ),
};

export function drawerOptions({
  navigation,
}: StackScreenProps<any>): StackNavigationOptions {
  return {
    ...defaultOptions,
    headerShown: true,
    headerStyle: {
      backgroundColor: '#FAFAFF',
    },
    headerLeft: (props) => (
      <HeaderBackButton
        {...props}
        onPress={() => {
          navigation.dispatch(DrawerActions.openDrawer());
        }}
        backImage={(iconProps) => <Menu {...iconProps} color="black" />}
      />
    ),
  };
}

export const dashboardOptions: StackNavigationOptions = {
  headerShown: true,
  headerTitleAlign: 'center',
  headerStyle: {
    elevation: 0,
    borderBottomWidth: 1,
    backgroundColor: '#FAFAFF',
    borderBottomColor: 'rgba(204, 204, 216, 0.5)',
  },
  headerBackImage: ({tintColor}) => (
    <ChevronLeft width={30} height={30} color={tintColor} />
  ),
};
