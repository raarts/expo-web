const Constants = {
  statusBarHeight: 0,
  expoVersion: 'n/a',
  expoRuntimeVersion: 'n/a',
  linkingUri: window.location.href.split('?')[0].split('#')[0],
  isDevice: false,
  manifest: {
    sdkVersion: 'expo-web',
    privacy: 'public',
    version: '1.0.0',
    orientation: 'landscape',
    primaryColor: '',
    splash: {
      image: './src/assets/images/splash.png',
      backgroundColor: '#ffffff',
      resizeMode: 'contain'
    },
    ios: {
      supportsTablet: true
    }
  }
};

export default Constants;
