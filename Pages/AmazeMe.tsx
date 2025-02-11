
// Import necessary React hooks and components
import React, { useEffect, useState } from "react";
// Import required React Native UI components
import { Text, View, TouchableHighlight, ScrollView, StyleSheet } from 'react-native';
// Import JSON file containing poem data
import PoemsData from '../Poems.json';
// Import custom font configurations
import { Fonts } from "../android/app/src/constants/fonts";

// Helper function to select a random poem from the PoemsData array
const getNewPoem = () => (
    PoemsData[Math.floor(Math.random() * PoemsData.length)]
);

// Main component definition with TypeScript navigation props
const AmazeMe = ({ navigation, route }: { navigation: any, route:any}) => {
    
    // Set navigation options when component mounts or when navigation/route changes
    useEffect(()=>{
        navigation.setOptions({
            title:route.name,
            headerTitleStyle:{
                fontFamily: Fonts.NotoSerif.Regular,
            },
        });
    }, [navigation, route]);
    
    // State hook for storing current poem
    const [poem, setpoem] = useState(getNewPoem());

    // Handler function to update poem state with a new random poem
    const handleNewPoem = () => {
        setpoem(getNewPoem());
    }

    // State and handlers for font size adjustment
    const [fontSize, setfontSize] = useState(styles.PoemText.fontSize)
    const addFontSize = () => {
        if (fontSize <= 25) {
            setfontSize(fontSize => fontSize + 1);
        }
    }

    const reduceFontSize = () => {
        if (fontSize >= 15) {
            setfontSize(fontSize - 1);
        }
    }

    // Update navigation title when poem changes
    useEffect(() => {
        navigation.setOptions({ title: poem.title });
    }, [navigation, poem.title]);

    // Component render method
    return (
        <View style={styles.container}>
            {/* Button to get new poem */}
            <TouchableHighlight
                style={styles.getNewPoemButton}
                onPress={handleNewPoem}
                underlayColor="#d3d3d3"
            >
                <Text style={styles.getNewPoemButtonText}>Get A New Poem!</Text>
            </TouchableHighlight>

            {/* Font size adjustment buttons container */}
            <View style={styles.buttonContainer}>
                {/* Decrease font size button */}
                <TouchableHighlight
                    style={styles.fontSizeButton}
                    activeOpacity={0.6}
                    underlayColor={'white'}
                    onPress={reduceFontSize}
                >
                    <Text style={styles.buttonText}>
                        Font Size -
                    </Text>
                </TouchableHighlight>
                {/* Increase font size button */}
                <TouchableHighlight
                    style={styles.fontSizeButton}
                    activeOpacity={0.6}
                    underlayColor={'white'}
                    onPress={addFontSize}
                >
                    <Text style={styles.buttonText}>
                        Font Size +
                    </Text>
                </TouchableHighlight>
            </View>

            {/* Scrollable poem container */}
            <ScrollView contentContainerStyle={styles.PoemTextContainer}>
                {/* Split poem into lines and render each line */}
                {poem.poem.split("\n").map((line: string, index: number) => (
                    <Text style={[styles.PoemText, { fontSize }]}>{line}{"\n"}</Text>
                ))}
            </ScrollView>
        </View>
    );
};

// StyleSheet definition for component styling
const styles = StyleSheet.create({
    container: {
        flex: 1,                    // Makes container take up all available space
        backgroundColor: "#FFF",    // Sets white background color
        padding: 10,               // Adds 10 units of padding on all sides
    },
    PoemText: {
        fontFamily: Fonts.NotoSerif.Regular,  // Sets custom Noto Serif font
        fontSize: 19,              // Sets text size to 19 units
        color: 'black',            // Sets text color to black
        textAlign: 'center',       // Centers the text horizontally
        lineHeight: 26,            // Sets vertical spacing between lines
    },
    PoemTextContainer: {
        backgroundColor: '#FFFFFF', // Sets white background
        padding: 20,               // Adds 20 units of padding on all sides
        elevation: 5,              // Adds elevation shadow (Android)
        shadowColor: "#000",       // Sets shadow color to black (iOS)
        shadowOffset: { 
            width: 0,              // No horizontal shadow offset
            height: 5              // 5 units vertical shadow offset
        },
        flexGrow: 1,              // Allows container to grow to fill space
    },
    button: {
        backgroundColor: "#43464b", // Sets dark gray background
        padding: 12,               // Adds 12 units of padding
        borderRadius: 8,           // Rounds corners by 8 units
        alignItems: "center",      // Centers items horizontally
        marginBottom: 5,           // Adds 5 units margin at bottom
        alignSelf: "center",       // Centers button in parent container
        width: 370,               // Sets fixed width of 370 units
    },
    buttonContainer: {
        flexDirection: 'row',      // Arranges children horizontally
        justifyContent: 'center',  // Centers content horizontally
        alignItems: 'center',      // Centers content vertically
        gap: 10,                  // Adds 10 units space between items
        paddingLeft: 10,          // Adds left padding of 10 units
        paddingRight: 10,         // Adds right padding of 10 units
    },
    buttonText: {
        fontFamily: Fonts.NotoSerif.Regular,  // Sets custom Noto Serif font
        color: 'black',            // Sets text color to black
        fontSize: 17,              // Sets text size to 17 units
        textAlign: 'center',       // Centers the text horizontally
    },
    fontSizeButton: {
        flex: 1,                   // Makes button take equal space
        height: 40,                // Sets fixed height of 40 units
        fontSize: 19,              // Sets text size to 19 units
        padding: 5,                // Adds 5 units padding all around
        borderRadius: 5,           // Rounds corners by 5 units
        alignItems: 'center',      // Centers items horizontally
        marginTop: 10,             // Adds 10 units margin at top
        marginBottom: 3,           // Adds 3 units margin at bottom
        backgroundColor: 'white',  // Sets white background
        justifyContent: 'center',  // Centers content vertically
        marginHorizontal: 5,       // Adds 5 units margin on sides
        elevation: 5,              // Adds elevation shadow (Android)
    },
    getNewPoemButton: {
        backgroundColor: "#1F1F1F", // Sets very dark gray background
        padding: 12,               // Adds 12 units padding all around
        borderRadius: 8,           // Rounds corners by 8 units
        alignItems: "center",      // Centers items horizontally
        marginBottom: 5,           // Adds 5 units margin at bottom
        alignSelf: "center",       // Centers button in parent container
        width: 370,               // Sets fixed width of 370 units
    },
    getNewPoemButtonText: {
        fontFamily: Fonts.NotoSerif.Regular,  // Sets custom Noto Serif font
        color: 'white',            // Sets text color to white
        fontSize: 20,              // Sets text size to 20 units
    },
});

// Export the component
export default AmazeMe

// import React, { useEffect, useState } from "react";
// import { Text, View, TouchableHighlight, ScrollView, StyleSheet } from 'react-native';
// import PoemsData from '../Poems.json';
// import { Fonts } from "../android/app/src/constants/fonts";

// //Get a random poem from Poems.json.
// const getNewPoem = () => (
//     PoemsData[Math.floor(Math.random() * PoemsData.length)]
// );



// const AmazeMe = ({ navigation, route }: { navigation: any, route:any}) => {
    
//     useEffect(()=>{
//         navigation.setOptions({
//             title:route.name,
//             headerTitleStyle:{
//                 fontFamily: Fonts.NotoSerif.Regular,
//             },
//         });
//     }, [navigation, route]);
    
    
//     const [poem, setpoem] = useState(getNewPoem());

//     const handleNewPoem = () => {
//         setpoem(getNewPoem());
//     }

//     const [fontSize, setfontSize] = useState(styles.PoemText.fontSize)
//     const addFontSize = () => {
//         if (fontSize <= 25) {
//             setfontSize(fontSize => fontSize + 1);
//         }
//     }

//     const reduceFontSize = () => {
//         if (fontSize >= 15) {
//             setfontSize(fontSize - 1);
//         }
//     }
//     useEffect(() => {
//         navigation.setOptions({ title: poem.title });
//     }, [navigation, poem.title]);

//     return (
//         <View style={styles.container}>
//             <TouchableHighlight
//                 style={styles.getNewPoemButton}
//                 onPress={handleNewPoem}//If pressed again, it gets a new poem
//                 underlayColor="#d3d3d3"
//             >
//                 <Text style={styles.getNewPoemButtonText}>Get A New Poem!</Text>
//             </TouchableHighlight>
//             <View style={styles.buttonContainer}>
//                 <TouchableHighlight
//                     style={styles.fontSizeButton}
//                     activeOpacity={0.6}
//                     underlayColor={'white'}
//                     onPress={reduceFontSize}
//                 >
//                     <Text style={styles.buttonText}>
//                         Font Size -
//                     </Text>
//                 </TouchableHighlight>
//                 <TouchableHighlight
//                     style={styles.fontSizeButton}
//                     activeOpacity={0.6}
//                     underlayColor={'white'}
//                     onPress={addFontSize}
//                 >
//                     <Text style={styles.buttonText}>
//                         Font Size +
//                     </Text>
//                 </TouchableHighlight>
//             </View>
//             <ScrollView contentContainerStyle={styles.PoemTextContainer}>
//                 {poem.poem.split("\n").map((line: string, index: number) => (
//                     <Text style={[styles.PoemText, { fontSize }]}>{line}{"\n"}</Text>
//                 ))}
//             </ScrollView>
//         </View>
//     );
// };





// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#FFF",
//         padding: 10,
//     },
//     PoemText: {
//         fontFamily:Fonts.NotoSerif.Regular,
//         fontSize: 19,
//         color: 'black',
//         textAlign: 'center',
//         lineHeight: 26,
//     },
//     PoemTextContainer: {
//         backgroundColor: '#FFFFFF',
//         padding: 20,
//         // marginVertical: 8,
//         // marginHorizontal: 10,
//         // borderRadius: 15,
//         elevation: 5,
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 5 },
//         flexGrow: 1,
//     },
//     button: {
//         backgroundColor: "#43464b",
//         padding: 12,
//         borderRadius: 8,
//         alignItems: "center",
//         marginBottom: 5,
//         alignSelf: "center",  // Prevents full width
//         width: 370,  // Adjust as needed
//     },
//     buttonContainer: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         gap: 10,
//         paddingLeft: 10,
//         paddingRight: 10,
//     },
//     buttonText: {
//         fontFamily:Fonts.NotoSerif.Regular,
//         color: 'black',
//         fontSize: 17,
//         textAlign: 'center',
//     },
//     fontSizeButton: {
//         flex: 1,
//         height: 40,
//         fontSize: 19,
//         padding: 5,
//         borderRadius: 5,
//         alignItems: 'center',
//         marginTop: 10,
//         marginBottom: 3,
//         backgroundColor: 'white',
//         justifyContent: 'center',
//         marginHorizontal: 5,
//         elevation: 5,
//     },
//     getNewPoemButton:{
//         backgroundColor: "#1F1F1F", //The color when pressed.
//         padding: 12,
//         borderRadius: 8,
//         alignItems: "center",
//         marginBottom: 5,
//         alignSelf: "center",  // Prevents full width
//         width: 370,  // Adjust as needed
//     },
//     getNewPoemButtonText:{
//         fontFamily:Fonts.NotoSerif.Regular, 
//         color: 'white', 
//         fontSize: 20, 
//     },
// });

// export default AmazeMe;