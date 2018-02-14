import React from 'react';
import Icon from 'react-native-vector-icons/dist/Feather';
import iconFont from 'react-native-vector-icons/Fonts/Feather.ttf';
const iconFontStyles = `@font-face {
  src: url(${iconFont});
  font-family: Feather;
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

export default class Feather extends React.Component {
  render() {
    return <Icon {...this.props} />;
  }
}
