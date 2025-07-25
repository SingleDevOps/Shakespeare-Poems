import React from 'react';
import { TouchableHighlight, Image } from 'react-native';
import { AmazeMe_Styles as styles } from '../stylesheets/AmazeMe_StyleSheet';

interface StarButtonProps {
  saved: boolean;
  onPress: () => void;
  colorScheme: 'light' | 'dark';
}

const StarButton: React.FC<StarButtonProps> = ({ saved, onPress, colorScheme }) => {
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

export default StarButton;
