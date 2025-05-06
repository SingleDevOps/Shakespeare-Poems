import React from 'react';
import { TouchableHighlight, Image, StyleSheet } from 'react-native';

interface SaveButtonProps {
  saved: boolean;
  onPress: () => void;
  colorScheme: 'light' | 'dark';
}

export const SaveButton: React.FC<SaveButtonProps> = ({ saved, onPress, colorScheme }) => {
  const starSource = saved
    ? require('../../assets/pictures/goldenstar.png')
    : colorScheme === 'dark'
    ? require('../../assets/pictures/whitestar.jpg')
    : require('../../assets/pictures/blackstar.png');

  return (
    <TouchableHighlight
      onPress={onPress}
      style={styles.savedPoemButton}
      underlayColor="transparent"
      activeOpacity={0.6}
    >
      <Image source={starSource} style={{ width: 30, height: 30 }} />
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  savedPoemButton: {
    padding: 8,
    borderRadius: 30,
    minWidth: 30,
    paddingLeft: 10,
    right: 10,
  },
}); 