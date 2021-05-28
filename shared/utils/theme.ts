import {DefaultTheme} from 'react-native-paper';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      primaryDark: string;
    }
  }
}

const theme = {
  ...DefaultTheme,
  roundness: 8,
  colors: {
    ...DefaultTheme.colors,
    primary: '#272393',
    accent: '#E8C45F',
    primaryDark: '#03021A',
  },
};

export default theme;
