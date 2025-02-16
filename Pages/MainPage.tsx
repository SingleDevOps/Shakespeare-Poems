import React, { useEffect } from "react";
import { StatusBar, Image, useColorScheme, Text, View, StyleSheet, TouchableHighlight } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Fonts } from "../android/app/src/constants/fonts";
import Poems from "./Poems";
import PoemDetail from "./PoemDetail";
import AmazeMe from "./AmazeMe";
import LikedPoem from "./LikedPoem";
import { color } from "react-native-elements/dist/helpers";
const Stack = createNativeStackNavigator();

const MainPage = ({ navigation, route }: { navigation: any, route: any }) => {
  const colorScheme = useColorScheme();

  useEffect(() => {
    navigation.setOptions({
      title: route.name,
      headerTitleStyle: {
        fontFamily: Fonts.NotoSerif.Regular,
        color: colorScheme === "light" ? "#1e1e1e" : "#f0f0f0",
      },
      headerStyle: {
        backgroundColor: colorScheme === "light" ? "#ffffff" : "#121212",
      },
      headerRight: () => (
        <TouchableHighlight
          onPressIn={() => { }}
          // onPress={() => navigation.navigate("LikedPoem")}
          underlayColor="transparent" // Optional: Prevents highlight effect
        >
          <Image
            source={
              require("../assets/pictures/redheart.png")
            }
            style={{ width: 24, height: 24 }}
          />
        </TouchableHighlight>
      ),
    });
  }, [navigation, route, colorScheme]);

  return (
    <View style={colorScheme === "light" ? styles.container : styles.darkContainer}>
      <StatusBar
        backgroundColor={colorScheme === 'light' ? "#ffffff" : "#1f1f1f"}
        showHideTransition={'fade'}
      >
      </StatusBar>
      <TouchableHighlight
        onPress={() => navigation.navigate("Poems")}
        style={colorScheme === "light" ? styles.touchable_Poems : styles.darkTouchable_Poems}
        underlayColor={colorScheme === "light" ? "#e0e0e0" : "#333333"}
        activeOpacity={0.7}
      >
        <View style={colorScheme === "light" ? styles.button : styles.darkButton}>
          <Text style={colorScheme === "light" ? styles.buttonText : styles.darkButtonText}>
            Poems
          </Text>
        </View>
      </TouchableHighlight>

      <TouchableHighlight
        onPress={() => navigation.navigate("AmazeMe")}
        style={colorScheme === "light" ? styles.touchable_AmazeMe : styles.darkTouchable_AmazeMe}
        underlayColor={colorScheme === "light" ? "#e0e0e0" : "#333333"}
        activeOpacity={0.7}
      >
        <View style={colorScheme === "light" ? styles.button : styles.darkButton}>
          <Text style={colorScheme === "light" ? styles.buttonText : styles.darkButtonText}>
            Amaze Me!
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const MainPageContainer = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Shakespeare Poems">
      <Stack.Screen name="Shakespeare Poems" component={MainPage} />
      <Stack.Screen name="Poems" component={Poems} />
      <Stack.Screen name="PoemDetail" component={PoemDetail} />
      <Stack.Screen name="AmazeMe" component={AmazeMe} />
      <Stack.Screen name="LikedPoem" component={LikedPoem} />
    </Stack.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    flexDirection: "column",
  },
  darkContainer: {
    flex: 1,
    backgroundColor: "#121212",
    flexDirection: "column",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  darkButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212"
  },
  buttonText: {
    fontFamily: Fonts.NotoSerif.Regular,
    color: "#1e1e1e",
    fontSize: 40,
    textAlign: "center",
  },
  darkButtonText: {
    fontFamily: Fonts.NotoSerif.Regular,
    color: "#f0f0f0",
    fontSize: 40,
    textAlign: "center",
  },
  touchable_Poems: {
    flex: 1,
    backgroundColor: "#ffffff",
    //     borderBottomWidth: 3,
    //     borderColor: "gold",
  },
  darkTouchable_Poems: {
    flex: 1,
    backgroundColor: "#1f1f1f",
  },
  touchable_AmazeMe: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  darkTouchable_AmazeMe: {
    flex: 1,
    backgroundColor: "#1f1f1f",
  },
});

export default MainPageContainer;