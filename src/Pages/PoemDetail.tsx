import React, { useEffect, useState, useCallback } from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableHighlight,
  useColorScheme,
} from 'react-native';
import { Fonts } from '../../android/app/src/constants/fonts';
import { checkPoemExistsInDB, insertPoem, deletePoem } from '../../src/services/database';
import { PoemDetail_styles as styles } from '../stylesheets/PoemDetail_StyleSheet';
import { NavigationProps, Poem } from '../types/navigation';
import { SaveButton } from '../components/SaveButton';

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

const PoemDetail: React.FC<NavigationProps> = ({ route, navigation }) => {
  const colorScheme = useColorScheme();
  const poem = route.params?.poem as Poem;
  const [fontSize, setFontSize] = useState(styles.PoemText.fontSize);
  const [saved, setSaved] = useState(false);

  const addFontSize = useCallback(() => {
    if (fontSize <= 25) {
      setFontSize(prevSize => prevSize + 1);
    }
  }, [fontSize]);

  const reduceFontSize = useCallback(() => {
    if (fontSize >= 15) {
      setFontSize(prevSize => prevSize - 1);
    }
  }, [fontSize]);

  const handleSavedPress = useCallback(async () => {
    try {
      if (!saved) {
        await insertPoem(poem.id, poem.poem, poem.author, poem.title);
        setSaved(true);
      } else {
        await deletePoem(poem.id);
        setSaved(false);
      }
    } catch (error) {
      console.error('Error handling poem save:', error);
    }
  }, [poem, saved]);

  useEffect(() => {
    const checkSavedStatus = async () => {
      try {
        const exists = await checkPoemExistsInDB(poem.id);
        setSaved(exists);
      } catch (error) {
        console.error('Error checking poem existence:', error);
      }
    };
    checkSavedStatus();
  }, [poem.id]);

  useEffect(() => {
    navigation.setOptions({
      title: poem.title,
      headerTitleStyle: {
        fontFamily: Fonts.NotoSerif.Regular,
        color: colorScheme === 'light' ? 'black' : 'white',
      },
      headerTintColor: colorScheme === 'light' ? 'black' : 'red',
      headerStyle: {
        backgroundColor: colorScheme === 'light' ? 'white' : '#121212',
      },
      headerRight: () => (
        <SaveButton
          saved={saved}
          onPress={handleSavedPress}
          colorScheme={colorScheme as 'light' | 'dark'}
        />
      ),
    });
  }, [navigation, poem.title, colorScheme, saved, handleSavedPress]);

  return (
    <View style={colorScheme === 'light' ? styles.container : styles.darkContainer}>
      <ScrollView
        contentContainerStyle={
          colorScheme === 'light'
            ? styles.PoemTextContainer
            : styles.darkPoemTextContainer
        }
      >
        {poem.poem.split('\n').map((line: string, index: number) => (
          <Text
            key={index}
            style={[
              colorScheme === 'light' ? styles.PoemText : styles.darkPoemText,
              { fontSize },
            ]}
          >
            {line}
            {'\n'}
          </Text>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <FontSizeButton
          label="Font Size -"
          onPress={reduceFontSize}
          colorScheme={colorScheme as 'light' | 'dark'}
        />
        <FontSizeButton
          label="Font Size +"
          onPress={addFontSize}
          colorScheme={colorScheme as 'light' | 'dark'}
        />
      </View>
    </View>
  );
};

export default PoemDetail;
