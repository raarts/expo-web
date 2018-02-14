import React from 'react';
import Icon from 'react-native-vector-icons/dist/Octicons';
import iconFont from 'react-native-vector-icons/Fonts/Octicons.ttf';
const iconFontStyles = `@font-face {
  src: url(${iconFont});
  font-family: Octicons;
}`;

// Create stylesheet
const style = document.createElement('style');
style.type = 'text/css';
if (style.styleSheet) {
  style.styleSheet.cssText = iconFontStyles;
} else {
  style.appendChild(document.createTextNode(iconFontStyles));
}

// Inject stylesheet
document.head.appendChild(style);

export default class Octicons extends React.Component {
  render() {
    return <Icon {...this.props} />;
  }
}
