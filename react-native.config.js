module.exports = {
  dependencies: {
    'react-native-video': {
      platforms: {
        android: {
          sourceDir: '../node_modules/react-native-video/android-exoplayer',
        },
      },
    },
  },
  project: {
    android: {},
    ios: {},
  },
  assets: ['./assets/fonts/','./modules/prospa/assets/fonts/']
};