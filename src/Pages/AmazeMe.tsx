import React, { useCallback, useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  useColorScheme,
} from 'react-native';
import PoemsData from '../../JsonFiles/Poems.json';
import { Fonts } from '../constants/fonts';
import { checkPoemExistsInDB, insertPoem, deletePoem } from '../services/database';
import { AmazeMe_Styles as styles } from '../stylesheets/AmazeMe_StyleSheet';
import { NavigationProps, Poem } from '../types/navigation';
import { SelectablePoemText } from '../components/SelectablePoemText';
import { SaveButton } from '../components/SaveButton';
import FontSizeButton from '../components/FontSizeButton';
import { useFontSize } from '../hooks/useFontSize';

const getNewPoem = (): Poem => {
  const randomPoem = PoemsData[Math.floor(Math.random() * PoemsData.length)];
  return {
    ...randomPoem,
    id: randomPoem.id.toString(),
  };
};

const AmazeMe: React.FC<NavigationProps> = ({ navigation }) => {
  const colorScheme = useColorScheme() ?? 'light';
  const [poem, setPoem] = useState<Poem>(getNewPoem());
  const { fontSize, addFontSize, reduceFontSize } = useFontSize(styles.PoemText.fontSize);
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

  const headerRight = useCallback(() => (
    <SaveButton
      saved={saved}
      onPress={handleSavedPress}
      colorScheme={colorScheme}
    />
  ), [saved, handleSavedPress, colorScheme]);

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
      headerRight,
    });
  }, [navigation, poem.title, colorScheme, headerRight]);

  return (
    <View style={colorScheme === 'light' ? styles.container : styles.darkContainer}>
      <ScrollView
        contentContainerStyle={
          colorScheme === 'light' ? styles.PoemTextContainer : styles.darkPoemTextContainer
        }
      >
        <SelectablePoemText
          text={poem.poem}
          fontSize={fontSize}
          colorScheme={colorScheme}
        />
      </ScrollView>

      <View style={styles.allButtonsContainer}>
        <View style={styles.buttonContainer}>
          <FontSizeButton
            label="Font Size -"
            onPress={reduceFontSize}
            colorScheme={colorScheme}
          />
          <FontSizeButton
            label="Font Size +"
            onPress={addFontSize}
            colorScheme={colorScheme}
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
