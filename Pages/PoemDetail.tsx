import React, { useEffect, useState, useCallback } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
  useColorScheme,
} from "react-native";
import { Fonts } from "../android/app/src/constants/fonts";
import RNFS from 'react-native-fs';

import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

const PoemDetail = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const colorScheme = useColorScheme();
  const Poem = route.params['poem'];//Poems.tsx passes a poem:item into poemdetail.
  const PoemText = Poem['poem'];
  const PoemTitle = Poem['title'];
  const PoemId = Poem['id'];
  const Author = Poem['author'];
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

  const handleLikePoem = useCallback(() => {
    setLiked(liked => !liked);
    const likedPoem = JSON.stringify(Poem);
    const filePath = RNFS.DocumentDirectoryPath + '/JsonFiles/LikedPoems.json';

    RNFS.writeFile(filePath, likedPoem, 'utf8')
        .then(() => {
            console.log('Poem saved successfully');
        })
        .catch((error) => {
            console.log('Error saving poem:', error);
        });
}, [Poem]);


  useEffect(() => {
    navigation.setOptions({
      title: PoemTitle,
      headerTitleStyle: {
        fontFamily: Fonts.NotoSerif.Regular,
        color: colorScheme === "light" ? "black" : "white",
      },
      headerTintColor: colorScheme === "light" ? "black" : "red",
      headerStyle: {
        backgroundColor: colorScheme === "light" ? "white" : "#121212",
      },
      headerRight: () => (
        <TouchableHighlight
          onPress={handleLikePoem}
          style={[
            styles.likePoemButton,
            colorScheme === "light" ? styles.lightButton : styles.darkButton
          ]}
          underlayColor={colorScheme === "light" ? "#e0e0e0" : "#333333"}
          activeOpacity={0.6}
        >
          <Text style={[
            styles.likePoemButtonText,
            colorScheme === "light" ? styles.lightText : styles.darkText
          ]}>
            {liked ? "Unlike" : "Like"}
          </Text>
        </TouchableHighlight>
      )
    });
  }, [navigation, PoemTitle, colorScheme, handleLikePoem, liked]);

  return (
    <View style={colorScheme === "light" ? styles.container : styles.darkContainer}>
      <View style={styles.buttonContainer}>
        <TouchableHighlight
          style={colorScheme === "light" ? styles.fontSizeButton : styles.darkFontSizeButton}
          activeOpacity={0.6}
          underlayColor={colorScheme === "light" ? "#e0e0e0" : "#333333"}
          onPress={reduceFontSize}
        >
          <Text style={colorScheme === "light" ? styles.buttonText : styles.darkButtonText}>
            Font Size -
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={colorScheme === "light" ? styles.fontSizeButton : styles.darkFontSizeButton}
          activeOpacity={0.6}
          underlayColor={colorScheme === "light" ? "#e0e0e0" : "#333333"}
          onPress={addFontSize}
        >
          <Text style={colorScheme === "light" ? styles.buttonText : styles.darkButtonText}>
            Font Size +
          </Text>
        </TouchableHighlight>
      </View>

      <ScrollView
        contentContainerStyle={
          colorScheme === "light"
            ? styles.PoemTextContainer
            : styles.darkPoemTextContainer
        }
      >
        {PoemText.split("\n").map((line: string, index: number) => (
          <Text
            key={index}
            style={[
              colorScheme === "light" ? styles.PoemText : styles.darkPoemText,
              { fontSize },
            ]}
          >
            {line}
            {"\n"}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  darkContainer: {
    flex: 1,
    backgroundColor: "#121212",
  },
  PoemText: {
    fontSize: 19,
    color: "black",
    fontFamily: Fonts.NotoSerif.Regular,
    textAlign: "center",
    lineHeight: 26,
  },
  darkPoemText: {
    fontSize: 19,
    color: "white",
    fontFamily: Fonts.NotoSerif.Regular,
    textAlign: "center",
    lineHeight: 26,
  },
  PoemTextContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    shadowOffset: { width: 0, height: 5 },
    flexGrow: 1,
  },
  darkPoemTextContainer: {
    backgroundColor: "#121212",
    padding: 20,
    shadowOffset: { width: 0, height: 5 },
    flexGrow: 1,
  },
  fontSizeButton: {
    flex: 1,
    height: 40,
    fontSize: 19,
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 3,
    backgroundColor: "white",
    justifyContent: "center",
    marginHorizontal: 5,
    elevation: 5,
  },
  darkFontSizeButton: {
    flex: 1,
    height: 40,
    fontSize: 19,
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 3,
    backgroundColor: "#1f1f1f",
    justifyContent: "center",
    marginHorizontal: 5,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    gap: 0,
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 17,
    fontFamily: Fonts.NotoSerif.Regular,
    textAlign: "center",
  },
  darkButtonText: {
    color: "white",
    fontSize: 17,
    fontFamily: Fonts.NotoSerif.Regular,
    textAlign: "center",
  },
  likePoemButton: {
    padding: 8,
    borderRadius: 30,
    minWidth: 70,
    paddingLeft:10,
    right:10,
  },
  lightButton: {
    backgroundColor: 'lightgray',
  },
  darkButton: {
    backgroundColor: '#1f1f1f',
  },
  likePoemButtonText: {
    fontSize: 16,
    fontFamily: Fonts.NotoSerif.Regular,
    textAlign: 'center',
  },
  lightText: {
    color: '#000000',
  },
  darkText: {
    color: '#ffffff',
  }
});

export default PoemDetail;
