import React from 'react';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import iconFont from 'react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf';
const iconFontStyles = `@font-face {
  src: url(${iconFont});
  font-family: MaterialCommunityIcons;
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

export default class MaterialCommunityIcons extends React.Component {
  render() {
    return <Icon {...this.props} />;
  }
}
