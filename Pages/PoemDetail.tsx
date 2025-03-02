import React, { useEffect, useState, useCallback } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
  useColorScheme,
  Image,
} from 'react-native';
import { Fonts } from '../android/app/src/constants/fonts';
import {checkPoemExistsInDB, insertPoem, deletePoem} from '../src/services/database';


// Define the headerRight component outside of PoemDetail
const LikeButton = ({
  liked,
  onPress,
  colorScheme,
}: {
  liked: boolean;
  onPress: () => void;
  colorScheme: 'light' | 'dark';
}) => {
  const heartSource = liked
    ? require('../assets/pictures/redheart.png')
    : colorScheme === 'dark'
    ? require('../assets/pictures/whiteheart.png')
    : require('../assets/pictures/blackheart.png'); // Use black heart for light mode

  return (
    <TouchableHighlight
      onPress={onPress}
      style={styles.likePoemButton}
      underlayColor="transparent"
      activeOpacity={0.6}
    >
      <Image
        source={heartSource}
        style={{ width: 24, height: 24 }}
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
  const [liked, setLiked] = useState(false);

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

  const handleLikePress = useCallback(() => {
    if (!liked) {
      insertPoem(Poem.id, Poem.poem, Poem.author, Poem.title)
        .then(() => {
          setLiked(true);
        })
        .catch((error) => {
          console.error('Error inserting poem:', error);
        });
    } else {
      deletePoem(Poem.id)
        .then(() => {
          setLiked(false);
        })
        .catch((error) => {
          console.error('Error deleting poem:', error);
        });
    }
  }, [Poem.author, Poem.id, Poem.poem, Poem.title, liked]);

  useEffect(() => {
    const check = async () => {
      try{
        const exists = await checkPoemExistsInDB(Poem.id);
        setLiked(exists);
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
        <LikeButton
          liked={liked}
          onPress={handleLikePress}
          colorScheme={colorScheme}
        />
      ),
    });
  }, [navigation, PoemTitle, colorScheme, liked, handleLikePress]);

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  darkContainer: {
    flex: 1,
    backgroundColor: '#121212',
  },
  PoemText: {
    fontSize: 19,
    color: 'black',
    fontFamily: Fonts.NotoSerif.Regular,
    textAlign: 'center',
    lineHeight: 26,
  },
  darkPoemText: {
    fontSize: 19,
    color: 'white',
    fontFamily: Fonts.NotoSerif.Regular,
    textAlign: 'center',
    lineHeight: 26,
  },
  PoemTextContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    shadowOffset: { width: 0, height: 5 },
    flexGrow: 1,
  },
  darkPoemTextContainer: {
    backgroundColor: '#121212',
    padding: 20,
    shadowOffset: { width: 0, height: 5 },
    flexGrow: 1,
  },
  fontSizeButton: {
    flex: 1,
    height: 50,
    fontSize: 19,
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 3,
    backgroundColor: 'white',
    justifyContent: 'center',
    marginHorizontal: 5,
    elevation: 5,
  },
  darkFontSizeButton: {
    flex: 1,
    height: 50,
    fontSize: 19,
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 3,
    backgroundColor: '#1f1f1f',
    justifyContent: 'center',
    marginHorizontal: 5,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    gap: 0,
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 17,
    fontFamily: Fonts.NotoSerif.Regular,
    textAlign: 'center',
  },
  darkButtonText: {
    color: 'white',
    fontSize: 17,
    fontFamily: Fonts.NotoSerif.Regular,
    textAlign: 'center',
  },
  likePoemButton: {
    padding: 8,
    borderRadius: 30,
    minWidth: 30,
    paddingLeft: 10,
    right: 10,
  },
});

export default PoemDetail;
