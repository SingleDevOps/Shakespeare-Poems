import React, { useEffect } from 'react';
import { StatusBar, useColorScheme, Text, View, TouchableHighlight } from 'react-native';
import { Fonts } from '../../android/app/src/constants/fonts';
import { MainPage_Styles as styles } from '../stylesheets/MainPage_StyleSheet';
import { NavigationProps } from '../types/navigation';

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

const MainPage: React.FC<NavigationProps> = ({ navigation, route }) => {
  const colorScheme = useColorScheme();

  useEffect(() => {
    navigation.setOptions({
      title: route.name,
      headerTitleStyle: {
        fontFamily: Fonts.NotoSerif.Regular,
        color: colorScheme === 'light' ? '#1e1e1e' : '#f0f0f0',
      },
      headerStyle: {
        backgroundColor: colorScheme === 'light' ? '#ffffff' : '#121212',
      },
    });
  }, [navigation, route, colorScheme]);

  const menuItems = [
    { title: 'Poems', screen: 'Poems' },
    { title: 'Amaze Me!', screen: 'AmazeMe' },
    { title: 'Saved Poems', screen: 'LikedPoem' },
  ];

  return (
    <View style={colorScheme === 'light' ? styles.container : styles.darkContainer}>
      <StatusBar
        backgroundColor={colorScheme === 'light' ? '#ffffff' : '#1f1f1f'}
        showHideTransition={'fade'}
      />
      {menuItems.map((item) => (
        <MenuButton
          key={item.screen}
          title={item.title}
          onPress={() => navigation.navigate(item.screen as any)}
          colorScheme={colorScheme as 'light' | 'dark'}
        />
      ))}
    </View>
  );
};

export default MainPage;

