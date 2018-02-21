import parser from 'ua-parser-js';
const ua = parser(navigator.userAgent);

const Constants = {
  statusBarHeight: 0,
  expoVersion: 'n/a',
  expoRuntimeVersion: 'n/a',
  linkingUri: window.location.href.split('?')[0].split('#')[0],
  isDevice: true,
  manifest: {
    sdkVersion: 'expo-web',
    privacy: 'public',
    version: '1.0.0',
    orientation: 'landscape',
    primaryColor: '#000000',
    splash: {
      image: './src/assets/images/splash.png',
      backgroundColor: '#ffffff',
      resizeMode: 'contain'
    },
    ios: {
      supportsTablet: true
    }
  },
  platform: {
    web: ua,
    statusBarHeight: 0
  }
};

export default Constants;
