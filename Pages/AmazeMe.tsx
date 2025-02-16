import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from "react-native";
import PoemsData from "../JsonFiles/Poems.json";
import { Fonts } from "../android/app/src/constants/fonts";

const getNewPoem = () => PoemsData[Math.floor(Math.random() * PoemsData.length)];

const AmazeMe = ({ navigation, route }: { navigation: any; route: any }) => {
  const colorScheme = useColorScheme();
  const [poem, setpoem] = useState(getNewPoem());
  const [fontSize, setfontSize] = useState(styles.PoemText.fontSize);

  useEffect(() => {
    navigation.setOptions({
      title: route.name,
      headerTitleStyle: {
        fontFamily: Fonts.NotoSerif.Regular,
        color: colorScheme === "light" ? "#1e1e1e" : "#f0f0f0",
      },
      headerTintColor: colorScheme === "light" ? "black" : "red",
      headerStyle:{
          backgroundColor: colorScheme === "light" ? "#FFF" : "#121212",
      },
    });
  }, [navigation, route, colorScheme]);

  const handleNewPoem = () => {
    setpoem(getNewPoem());
  };

  const addFontSize = () => {
    if (fontSize <= 25) {
      setfontSize(fontSize + 1);
    }
  };

  const reduceFontSize = () => {
    if (fontSize >= 15) {
      setfontSize(fontSize - 1);
    }
  };

  useEffect(() => {
    navigation.setOptions({ title: poem.title });
  }, [navigation, poem.title]);

  return (
    <View
      style={
        colorScheme === "light"
          ? styles.container
          : styles.darkContainer
      }
    >
      <TouchableHighlight
        style={
          colorScheme === "light"
            ? styles.getNewPoemButton
            : styles.darkGetNewPoemButton
        }
        onPress={handleNewPoem}
        underlayColor={colorScheme === "light" ? "#d3d3d3" : "#333333"}
      >
        <Text
          style={
            colorScheme === "light"
              ? styles.getNewPoemButtonText
              : styles.darkGetNewPoemButtonText
          }
        >
          Get A New Poem!
        </Text>
      </TouchableHighlight>

      <View style={styles.buttonContainer}>
        <TouchableHighlight
          style={
            colorScheme === "light"
              ? styles.fontSizeButton
              : styles.darkFontSizeButton
          }
          activeOpacity={0.6}
          underlayColor={colorScheme === "light" ? "white" : "#333333"}
          onPress={reduceFontSize}
        >
          <Text
            style={
              colorScheme === "light"
                ? styles.buttonText
                : styles.darkButtonText
            }
          >
            Font Size -
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={
            colorScheme === "light"
              ? styles.fontSizeButton
              : styles.darkFontSizeButton
          }
          activeOpacity={0.6}
          underlayColor={colorScheme === "light" ? "white" : "#333333"}
          onPress={addFontSize}
        >
          <Text
            style={
              colorScheme === "light"
                ? styles.buttonText
                : styles.darkButtonText
            }
          >
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
        {poem.poem.split("\n").map((line: string, index: number) => (
          <Text
            key={index}
            style={[
              colorScheme === "light"
                ? styles.PoemText
                : styles.darkPoemText,
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
    backgroundColor: "#FFF",
    padding: 10,
  },
  darkContainer: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 10,
  },
  PoemText: {
    fontFamily: Fonts.NotoSerif.Regular,
    fontSize: 19,
    color: "black",
    textAlign: "center",
    lineHeight: 26,
  },
  darkPoemText: {
    fontFamily: Fonts.NotoSerif.Regular,
    fontSize: 19,
    color: "white",
    textAlign: "center",
    lineHeight: 26,
  },
  PoemTextContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    flexGrow: 1,
  },
  darkPoemTextContainer: {
    backgroundColor: "#121212",
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    flexGrow: 1,
  },
  button: {
    backgroundColor: "#43464b",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 5,
    alignSelf: "center",
    width: 370,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonText: {
    fontFamily: Fonts.NotoSerif.Regular,
    color: "black",
    fontSize: 17,
    textAlign: "center",
  },
  darkButtonText: {
    fontFamily: Fonts.NotoSerif.Regular,
    color: "white",
    fontSize: 17,
    textAlign: "center",
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
  getNewPoemButton: {
    backgroundColor: "#1F1F2F",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 5,
    alignSelf: "center",
    width: 370,
  },
  darkGetNewPoemButton: {
    backgroundColor: "#43464b",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 5,
    alignSelf: "center",
    width: 370,
  },
  getNewPoemButtonText: {
    fontFamily: Fonts.NotoSerif.Regular,
    color: "white",
    fontSize: 20,
  },
  darkGetNewPoemButtonText: {
    fontFamily: Fonts.NotoSerif.Regular,
    color: "white",
    fontSize: 20,
  },
});

export default AmazeMe;