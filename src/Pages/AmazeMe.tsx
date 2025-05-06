import React, { useCallback, useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  useColorScheme,
  Image,
} from 'react-native';
import PoemsData from '../../JsonFiles/Poems.json';
import { Fonts } from '../../android/app/src/constants/fonts';
import { checkPoemExistsInDB, insertPoem, deletePoem } from '../../src/services/database';
import { AmazeMe_Styles as styles } from '../stylesheets/AmazeMe_StyleSheet';
import { NavigationProps, Poem } from '../types/navigation';

const getNewPoem = (): Poem => {
  const randomPoem = PoemsData[Math.floor(Math.random() * PoemsData.length)];
  return {
    ...randomPoem,
    id: randomPoem.id.toString(),
  };
};

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

interface FontSizeButtonProps {
  label: string;
  onPress: () => void;
  colorScheme: 'light' | 'dark';
}

const FontSizeButton: React.FC<FontSizeButtonProps> = ({ label, onPress, colorScheme }) => (
  <TouchableHighlight
    style={colorScheme === 'light' ? styles.fontSizeButton : styles.darkFontSizeButton}
    activeOpacity={0.6}
    underlayColor={colorScheme === 'light' ? 'white' : '#333333'}
    onPress={onPress}
  >
    <Text style={colorScheme === 'light' ? styles.buttonText : styles.darkButtonText}>
      {label}
    </Text>
  </TouchableHighlight>
);

const AmazeMe: React.FC<NavigationProps> = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const [poem, setPoem] = useState<Poem>(getNewPoem());
  const [fontSize, setFontSize] = useState(styles.PoemText.fontSize);
  const [saved, setSaved] = useState(false);

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

  const handleNewPoem = useCallback(() => {
    setPoem(getNewPoem());
  }, []);

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
        color: colorScheme === 'light' ? '#1e1e1e' : '#f0f0f0',
      },
      headerTintColor: colorScheme === 'light' ? 'black' : 'red',
      headerStyle: {
        backgroundColor: colorScheme === 'light' ? '#FFF' : '#121212',
      },
      headerRight: () => (
        <StarButton
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
          colorScheme === 'light' ? styles.PoemTextContainer : styles.darkPoemTextContainer
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

      <View style={styles.allButtonsContainer}>
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

        <TouchableHighlight
          style={
            colorScheme === 'light'
              ? styles.getNewPoemButton
              : styles.darkGetNewPoemButton
          }
          onPress={handleNewPoem}
          underlayColor={colorScheme === 'light' ? '#d3d3d3' : '#333333'}
        >
          <Text
            style={
              colorScheme === 'light'
                ? styles.getNewPoemButtonText
                : styles.darkGetNewPoemButtonText
            }
          >
            Get A New Poem!
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default AmazeMe;
