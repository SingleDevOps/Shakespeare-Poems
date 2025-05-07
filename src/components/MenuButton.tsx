import React from 'react';
import { TouchableHighlight, Text, View } from 'react-native';
import { MainPage_Styles as styles } from '../stylesheets/MainPage_StyleSheet';

interface MenuButtonProps {
  title: string;
  description?: string;
  onPress: () => void;
  colorScheme: 'light' | 'dark';
}

const MenuButton: React.FC<MenuButtonProps> = ({ title, description, onPress, colorScheme }) => {
  return (
    <TouchableHighlight
      style={colorScheme === 'light' ? styles.button : styles.darkButton}
      onPress={onPress}
      underlayColor={colorScheme === 'light' ? '#f0f0f0' : '#2a2a2a'}
    >
      <View>
        <Text style={colorScheme === 'light' ? styles.buttonText : styles.darkButtonText}>
          {title}
        </Text>
        {description && (
          <Text
            style={
              colorScheme === 'light' ? styles.buttonDescription : styles.darkButtonDescription
            }
          >
            {description}
          </Text>
        )}
      </View>
    </TouchableHighlight>
  );
};

export default MenuButton; 