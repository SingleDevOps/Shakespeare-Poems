import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
  useColorScheme,
} from "react-native";
import { Fonts } from "../android/app/src/constants/fonts";

const PoemDetail = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const colorScheme = useColorScheme();
  const PoemText = route.params["text"];
  const PoemTitle = route.params["title"];
  const [fontSize, setfontSize] = useState(styles.PoemText.fontSize);

  const addFontSize = () => {
    if (fontSize <= 25) {
      setfontSize((fontSize) => fontSize + 1);
    }
  };

  const reduceFontSize = () => {
    if (fontSize >= 15) {
      setfontSize(fontSize - 1);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: PoemTitle,
      headerTitleStyle: {
        fontFamily: Fonts.NotoSerif.Regular,
        color: colorScheme === "light" ? "black" : "white",
      },
      headerTintColor: colorScheme === "light" ? "black" : "white",
      headerStyle:{
          backgroundColor: colorScheme === "light" ? "white" : "#121212",
      },
    });
  }, [navigation, PoemTitle, colorScheme]);

  return (
    <View
      style={
        colorScheme === "light" ? styles.container : styles.darkContainer
      }
    >
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
        {PoemText.split("\n").map((line: string, index: number) => (
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
});

export default PoemDetail;