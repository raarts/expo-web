const WebBrowser = {
  dismissBrowser: () => {},
  openAuthSessionAsync: url => window.open(url),
  openBrowserAsync: url => window.open(url, '_blank')
};

export default WebBrowser;
