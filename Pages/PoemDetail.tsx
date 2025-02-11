import React, { useEffect, useState } from "react";
import { ScrollView, Text, StyleSheet, View, TouchableHighlight } from 'react-native';
import { Fonts } from "../android/app/src/constants/fonts";
const PoemDetail = ({ route, navigation }: { route: any, navigation: any }) => {
    const PoemText = route.params['text'];
    const PoemTitle = route.params['title'];
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

    useEffect(() => {
        navigation.setOptions({
            title: PoemTitle,
            headerTitleStyle: {
                fontFamily: Fonts.NotoSerif.Regular,
            }
        });
    }, [navigation, PoemTitle]);



    return (
        <View style={{flex:1}}>

            <View style={styles.buttonContainer}>
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

            <ScrollView contentContainerStyle={styles.PoemTextContainer}>
                {PoemText.split("\n").map((line: string, index: number) => (
                    <Text style={[styles.PoemText, { fontSize }]}>{line}{"\n"}</Text>
                ))}
            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    PoemText: {
        fontSize: 19,
        color: 'black',
        fontFamily: Fonts.NotoSerif.Regular,
        textAlign: 'center',
        lineHeight: 26,
    },
    PoemTextContainer: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        // marginVertical: 8,
        // marginHorizontal: 10,
        // borderRadius: 15,
        // elevation: 5,
        // shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },

    },
    fontSizeButton: {
        flex: 1,
        height: 40,
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
        fontFamily:Fonts.NotoSerif.Regular,
        textAlign: 'center',
    },
});



export default PoemDetail;