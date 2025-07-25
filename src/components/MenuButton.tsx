import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { MainPage_Styles as styles } from '../stylesheets/MainPage_StyleSheet';

interface MenuButtonProps {
  title: string;
  onPress: () => void;
  colorScheme: 'light' | 'dark';
}

const MenuButton: React.FC<MenuButtonProps> = ({ title, onPress, colorScheme }) => (
  <TouchableHighlight
    onPress={onPress}
    style={colorScheme === 'light' ? styles.touchable_Poems : styles.darkTouchable_Poems}
    underlayColor={colorScheme === 'light' ? '#e0e0e0' : '#333333'}
    activeOpacity={0.7}
  >
    <View style={colorScheme === 'light' ? styles.button : styles.darkButton}>
      <Text style={colorScheme === 'light' ? styles.buttonText : styles.darkButtonText}>
        {title}
      </Text>
    </View>
  </TouchableHighlight>
);

export default MenuButton;
