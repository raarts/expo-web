import moment from 'moment';

const Util = {
  getCurrentDeviceCountryAsync: async () => {
    let lang = navigator.browserLanguage;
    if (typeof lang === 'undefined') {
      lang = navigator.language;
    }
    return lang;
  },
  getCurrentLocaleAsync: async () => navigator.languages[0],
  getCurrentTimeZoneAsync: async () => moment.tz.guess(),
  reload: () => window.location.reload(true)
};

export default Util;
