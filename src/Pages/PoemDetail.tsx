import React, { useEffect, useState, useCallback } from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableHighlight,
  useColorScheme,
  Image,
} from 'react-native';
import { Fonts } from '../../android/app/src/constants/fonts';
import {checkPoemExistsInDB, insertPoem, deletePoem} from '../../src/services/database';
import { PoemDetail_styles as styles } from '../stylesheets/PoemDetail_StyleSheet';

// Define the headerRight component outside of PoemDetail
const SaveButton = ({
  saved,
  onPress,
  colorScheme,
}: {
  saved: boolean;
  onPress: () => void;
  colorScheme: 'light' | 'dark';
}) => {
  const heartSource = saved
    ? require('../../assets/pictures/goldenstar.png')
    : colorScheme === 'dark'
    ? require('../../assets/pictures/whitestar.jpg')
    : require('../../assets/pictures/blackstar.png'); // Use black heart for light mode

  return (
    <TouchableHighlight
      onPress={onPress}
      style={styles.savedPoemButton}
      underlayColor="transparent"
      activeOpacity={0.6}
    >
      <Image
        source={heartSource}
        style={{ width: 30, height: 30 }}
      />
    </TouchableHighlight>
  );
};

const PoemDetail = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const colorScheme = useColorScheme();
  const Poem = route.params.poem;
  const PoemText = Poem.poem;
  const PoemTitle = Poem.title;
  const [fontSize, setFontSize] = useState(styles.PoemText.fontSize);
  const [saved, setsaved] = useState(false);

  const addFontSize = useCallback(() => {
    if (fontSize <= 25) {
      setFontSize((prevSize) => prevSize + 1);
    }
  }, [fontSize]);

  const reduceFontSize = useCallback(() => {
    if (fontSize >= 15) {
      setFontSize((prevSize) => prevSize - 1);
    }
  }, [fontSize]);

  const handlesavedPress = useCallback(() => {
    if (!saved) {
      insertPoem(Poem.id, Poem.poem, Poem.author, Poem.title)
        .then(() => {
          setsaved(true);
        })
        .catch((error) => {
          console.error('Error inserting poem:', error);
        });
    } else {
      deletePoem(Poem.id)
        .then(() => {
          setsaved(false);
        })
        .catch((error) => {
          console.error('Error deleting poem:', error);
        });
    }
  }, [Poem.author, Poem.id, Poem.poem, Poem.title, saved]);

  useEffect(() => {
    const check = async () => {
      try{
        const exists = await checkPoemExistsInDB(Poem.id);
        setsaved(exists);
      } catch(error){
        console.error('Error checking poem existence:', error);
      }
    };
    check();
  }, [Poem.id]);

  useEffect(() => {
    navigation.setOptions({
      title: PoemTitle,
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
          onPress={handlesavedPress}
          colorScheme={colorScheme}
        />
      ),
    });
  }, [navigation, PoemTitle, colorScheme, saved, handlesavedPress]);

  return (
    <View style={colorScheme === 'light' ? styles.container : styles.darkContainer}>
      <ScrollView
        contentContainerStyle={
          colorScheme === 'light'
            ? styles.PoemTextContainer
            : styles.darkPoemTextContainer
        }
      >
        {PoemText.split('\n').map((line: string, index: number) => (
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
        <TouchableHighlight
          style={colorScheme === 'light' ? styles.fontSizeButton : styles.darkFontSizeButton}
          activeOpacity={0.6}
          underlayColor={colorScheme === 'light' ? '#e0e0e0' : '#333333'}
          onPress={reduceFontSize}
        >
          <Text style={colorScheme === 'light' ? styles.buttonText : styles.darkButtonText}>
            Font Size -
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={colorScheme === 'light' ? styles.fontSizeButton : styles.darkFontSizeButton}
          activeOpacity={0.6}
          underlayColor={colorScheme === 'light' ? '#e0e0e0' : '#333333'}
          onPress={addFontSize}
        >
          <Text style={colorScheme === 'light' ? styles.buttonText : styles.darkButtonText}>
            Font Size +
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default PoemDetail;
