import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  useColorScheme,
} from 'react-native';
import PoemsData from '../../JsonFiles/Poems.json';
import { Fonts } from '../../android/app/src/constants/fonts';
import {checkPoemExistsInDB, insertPoem, deletePoem} from '../../src/services/database';
import {AmazeMe_Styles as styles} from '../stylesheets/AmazeMe_StyleSheet';
const getNewPoem = () => PoemsData[Math.floor(Math.random() * PoemsData.length)];

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
    : require('../../assets/pictures/blackstar.png');

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


const AmazeMe = ({ navigation }: { navigation: any}) => {
  const colorScheme = useColorScheme();
  const [poem, setpoem] = useState(getNewPoem());
  const [fontSize, setfontSize] = useState(styles.PoemText.fontSize);
  const [saved, setsaved] = useState(false);

  // Update the navigation title when the poem changes
  useEffect(() => {
      navigation.setOptions({ title: poem.title });
  }, [navigation, poem.title]);

  // Update other options and headerRight based on colorScheme and saved
  useEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontFamily: Fonts.NotoSerif.Regular,
        color: colorScheme === 'light' ? '#1e1e1e' : '#f0f0f0',
      },
      headerTintColor: colorScheme === 'light' ? 'black' : 'red',
      headerStyle:{
          backgroundColor: colorScheme === 'light' ? '#FFF' : '#121212',
      },
      headerRight: () => (
        <SaveButton
          saved={saved}
          onPress={handleSavedPress}
          colorScheme={colorScheme}
        />
      ),
    });
  }, [navigation, colorScheme, saved,handleSavedPress]);

  const handleSavedPress = useCallback(() => {
    if (!saved) {
      insertPoem(poem.id, poem.poem, poem.author, poem.title)
        .then(() => {
          setsaved(true);
        })
        .catch((error) => {
          console.error('Error inserting poem:', error);
        });
    } else {
      deletePoem(poem.id)
        .then(() => {
          setsaved(false);
        })
        .catch((error) => {
          console.error('Error deleting poem:', error);
        });
    }
  }, [poem.author, poem.id, poem.poem, poem.title, saved]);

  useEffect(() => {
    const check = async () => {
      try{
        const exists = await checkPoemExistsInDB(poem.id);
        setsaved(exists);
      } catch(error){
        console.error('Error checking poem existence:', error);
      }
    };
    check();
  }, [poem.id]);

  const handleNewPoem = () => {
    setpoem(getNewPoem());
  };

  const addFontSize = useCallback(() => {
    if (fontSize <= 25) {
      setfontSize((prevSize) => prevSize + 1);
    }
  }, [fontSize]);

  const reduceFontSize = useCallback(() => {
    if (fontSize >= 15) {
      setfontSize(fontSize - 1);
    }
  }, [fontSize]);



  return (
    <View
      style={
        colorScheme === 'light'
          ? styles.container
          : styles.darkContainer
      }
    >
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
              colorScheme === 'light'
                ? styles.PoemText
                : styles.darkPoemText,
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
          <TouchableHighlight
            style={
              colorScheme === 'light'
                ? styles.fontSizeButton
                : styles.darkFontSizeButton
            }
            activeOpacity={0.6}
            underlayColor={colorScheme === 'light' ? 'white' : '#333333'}
            onPress={reduceFontSize} 
          >
            <Text
              style={
                colorScheme === 'light'
                  ? styles.buttonText
                  : styles.darkButtonText
              }
            >
              Font Size -
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={
              colorScheme === 'light'
                ? styles.fontSizeButton
                : styles.darkFontSizeButton
            }
            activeOpacity={0.6}
            underlayColor={colorScheme === 'light' ? 'white' : '#333333'}
            onPress={addFontSize} 
          >
            <Text
              style={
                colorScheme === 'light'
                  ? styles.buttonText
                  : styles.darkButtonText
              }
            >
              Font Size +
            </Text>
          </TouchableHighlight>
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
