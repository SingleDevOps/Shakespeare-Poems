import React from 'react';
import { Text, TouchableHighlight } from 'react-native';
import { PoemDetail_styles as styles } from '../stylesheets/PoemDetail_StyleSheet';

interface FontSizeButtonProps {
  label: string;
  onPress: () => void;
  colorScheme: 'light' | 'dark';
}

const FontSizeButton: React.FC<FontSizeButtonProps> = ({ label, onPress, colorScheme }) => (
  <TouchableHighlight
    style={colorScheme === 'light' ? styles.fontSizeButton : styles.darkFontSizeButton}
    activeOpacity={0.6}
    underlayColor={colorScheme === 'light' ? '#e0e0e0' : '#333333'}
    onPress={onPress}
  >
    <Text style={colorScheme === 'light' ? styles.buttonText : styles.darkButtonText}>
      {label}
    </Text>
  </TouchableHighlight>
);

export default FontSizeButton; 