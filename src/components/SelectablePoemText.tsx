import React from 'react';
import { Text, StyleSheet, useColorScheme } from 'react-native';
import { Fonts } from '../../android/app/src/constants/fonts';

interface SelectablePoemTextProps {
  text: string;
  fontSize: number;
  colorScheme: 'light' | 'dark';
  style?: any;
}

export const SelectablePoemText: React.FC<SelectablePoemTextProps> = ({
  text,
  fontSize,
  colorScheme,
  style,
}) => {
  // Split the text into lines and join them with proper spacing
  const formattedText = text.split('\n').join('\n\n');

  return (
    <Text
      selectable
      style={[
        styles.text,
        colorScheme === 'light' ? styles.lightText : styles.darkText,
        { fontSize },
        style
      ]}
    >
      {formattedText}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.NotoSerif.Regular,
    textAlign: 'center',
    lineHeight: 26,
  },
  lightText: {
    color: 'black',
  },
  darkText: {
    color: 'white',
  },
}); 