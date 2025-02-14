import React, { useEffect } from "react";
import { useColorScheme, Text, View, StyleSheet, TouchableHighlight } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Fonts } from "../android/app/src/constants/fonts";
import Poems from "./Poems";
import PoemDetail from "./PoemDetail";
import AmazeMe from "./AmazeMe";

const Stack = createNativeStackNavigator();

const MainPage = ({ navigation, route }) => {
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
    });
  }, [navigation, route, colorScheme]);

  return (
    <View style={colorScheme === "light" ? styles.container : styles.darkContainer}>
      <TouchableHighlight
        onPress={() => navigation.navigate("Poems")}
        style={colorScheme === "light" ? styles.touchable : styles.darkTouchable}
        underlayColor={colorScheme === "light" ? "#e0e0e0" : "#333333"}
        activeOpacity={0.7}
      >
       <View style={colorScheme === "light" ? styles.button: styles.darkButton}>
          <Text style={colorScheme === "light" ? styles.buttonText : styles.darkButtonText}>
            Poems
          </Text>
        </View>
      </TouchableHighlight>

      <TouchableHighlight
        onPress={() => navigation.navigate("AmazeMe")}
        style={colorScheme === "light" ? styles.touchable : styles.darkTouchable}
        underlayColor={colorScheme === "light" ? "#e0e0e0" : "#333333"}
        activeOpacity={0.7}
      >
        <View style={colorScheme === "light" ? styles.button: styles.darkButton}>
          <Text style={colorScheme === "light" ? styles.buttonText : styles.darkButtonText}>
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
  touchable: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  darkTouchable: {
    flex: 1,
    backgroundColor: "#1f1f1f",
  },
});

export default PageContainer;
// import React, {useEffect} from "react";
// import { Text, View, StyleSheet, TouchableHighlight, useColorScheme} from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { Fonts } from "../android/app/src/constants/fonts";
// import Poems from './Poems'
// import PoemDetail from './PoemDetail';
// import AmazeMe from './AmazeMe';




// const Stack = createNativeStackNavigator();

// const MainPage = ({ navigation, route }: { navigation: any, route:any}) => {

//   const colorScheme = useColorScheme();

//   useEffect(()=>{
//     navigation.setOptions({
//       title:route.name,
//       headerTitleStyle:{
//         fontFamily:Fonts.NotoSerif.Regular,
//         color:colorScheme === 'light'?'black':'white',
//       },
//       headerStyle:{
//         backgroundColor: colorScheme === 'light'?'white':'#021526',
//       }
//     });
//   }, [navigation,route]);


//   return (
//     <View style={styles.container}>
//       <TouchableHighlight
//         onLongPress={()=>{}}
//         onPress={() => navigation.navigate("Poems")}
//         style={colorScheme === 'light'?styles.TouchableHighlight:styles.darkTouchableHighlight}
//         underlayColor={colorScheme==='light'?"#d3d3d3":"#6EACDA"}
//         activeOpacity={0.6}
//       >
//         <View style={styles.button}>
//         <Text style={colorScheme === 'light'?styles.buttonText:styles.darkBottomText}>
//           Poems</Text>
//         </View>
//       </TouchableHighlight>

//       <TouchableHighlight
//         onLongPress={()=>{}}
//         onPress={() => navigation.navigate("AmazeMe")}
//         style={colorScheme === 'light'?styles.TouchableHighlight:styles.darkTouchableHighlight}
//         underlayColor={colorScheme==='light'?"#d3d3d3":"#6EACDA"}
//         activeOpacity={0.6}
//       >
//         <View style={styles.button}>
//           <Text style={colorScheme === 'light'?styles.buttonText:styles.darkBottomText}>
//             Amaze Me!
//           </Text>
//         </View>
//       </TouchableHighlight>

//     </View>
//   );
// };

// const PageContainer = () => (
//   <NavigationContainer>
//     <Stack.Navigator initialRouteName="Shakespeare Poems">
//       <Stack.Screen name="Shakespeare Poems" component={MainPage} />
//       <Stack.Screen name="Poems" component={Poems} />
//       <Stack.Screen name="PoemDetail" component={PoemDetail} />
//       <Stack.Screen name="AmazeMe" component={AmazeMe} />
//     </Stack.Navigator>
//   </NavigationContainer>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//   },
//   darkcontainer:{
//     flex: 1,
//     flexDirection: 'column',
//     backgroundColor: '#021526',
//   },
//   button: {
//     flex: 1,
//     backgroundColor: "transparent",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   buttonText: {
//     fontFamily: Fonts.NotoSerif.Regular,
//     color: "black",
//     fontSize: 40,
//     textAlign: "center",
//   },
//   darkBottomText:{
//     fontFamily: Fonts.NotoSerif.Regular,
//     color:'white',
//     fontSize: 40,
//     textAlign: "center",

//   },
//   TouchableHighlight: {
//     flex:1,
//     backgroundColor: 'white',
//   },
//   darkTouchableHighlight:{
//     flex:1,
//     backgroundColor: '#021526',
//   }
// });

// // Export the container, NOT just MainPage
// export default PageContainer;
