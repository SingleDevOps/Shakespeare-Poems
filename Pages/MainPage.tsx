import React, {useEffect} from "react";
import { Text, View, StyleSheet, TouchableHighlight, ImageBackground} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Fonts } from "../android/app/src/constants/fonts";
import Poems from './Poems'
import PoemDetail from './PoemDetail';
import AmazeMe from './AmazeMe';


const Stack = createNativeStackNavigator();

const MainPage = ({ navigation, route }: { navigation: any, route:any}) => {

  useEffect(()=>{
    navigation.setOptions({
      title:route.name,
      headerTitleStyle:{
        fontFamily:Fonts.NotoSerif.Regular,
      },
    });
  }, [navigation,route]);

  
  return (
    <View style={styles.container}>
      <TouchableHighlight
        onLongPress={()=>{}}
        onPress={() => navigation.navigate("Poems")}
        style={styles.TouchableHighlight}
        underlayColor={"#d3d3d3"}
        activeOpacity={0.6}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>Poems</Text>
        </View>
      </TouchableHighlight>

      <TouchableHighlight
        onLongPress={()=>{}}
        onPress={() => navigation.navigate("AmazeMe")}
        style={styles.TouchableHighlight}
        underlayColor={"#d3d3d3"}
        activeOpacity={0.6}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>
            Amaze Me!
          </Text>
        </View>
      </TouchableHighlight>

    </View>
  );
};

const PageContainer = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Shakespeare Poems">
      <Stack.Screen name="Shakespeare Poems" component={MainPage} />
      <Stack.Screen name="Poems" component={Poems} />
      <Stack.Screen name="PoemDetail" component={PoemDetail} />
      <Stack.Screen name="AmazeMe" component={AmazeMe} />
    </Stack.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  background:{
    flex:1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  button: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: Fonts.NotoSerif.Regular,
    color: "black",
    fontSize: 40,
    textAlign: "center",
  },
  TouchableHighlight: {
    flex:1,
    backgroundColor: 'white',
  }
});

// Export the container, NOT just MainPage
export default PageContainer;
