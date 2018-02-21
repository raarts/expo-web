import parser from 'ua-parser-js';
const ua = parser.getResult();

// {
//   ua: "",
//   browser: {
//     name: "",
//     version: ""
//   },
//   engine: {
//     name: "",
//     version: ""
//   },
//   os: {
//     name: "",
//     version: ""
//   },
//   device: {
//     model: "",
//     type: "",
//     vendor: ""
//   },
//   cpu: {
//     architecture: ""
//   }
// }

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
    web: {
      buildNumber : ua.browser.version,
      model: ua.device.model,
      type: ua.device.type,
      vendor: ua.device.vendor,
      platform : ua.cpu.architecture,
      os: ua.os.name,
      systemVersion : ua.os.version,
      userInterfaceIdiom : 'web'
    },
    statusBarHeight: 0,
  }
};

export default Constants;
