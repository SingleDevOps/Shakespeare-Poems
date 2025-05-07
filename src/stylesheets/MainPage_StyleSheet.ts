import { StyleSheet } from 'react-native';
import { Fonts } from '../../android/app/src/constants/fonts';

export const MainPage_Styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      flexDirection: 'column',
    },
    darkContainer: {
      flex: 1,
      backgroundColor: '#121212',
      flexDirection: 'column',
    },
    button: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    darkButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#121212',
    },
    buttonText: {
      fontFamily: Fonts.NotoSerif.Regular,
      color: '#1e1e1e',
      fontSize: 40,
      textAlign: 'center',
    },
    darkButtonText: {
      fontFamily: Fonts.NotoSerif.Regular,
      color: '#f0f0f0',
      fontSize: 40,
      textAlign: 'center',
    },
    touchable_Poems: {
      flex: 1,
      backgroundColor: '#ffffff',
      //     borderBottomWidth: 3,
      //     borderColor: "gold",
    },
    darkTouchable_Poems: {
      flex: 1,
      backgroundColor: '#1f1f1f',
    },
    touchable_AmazeMe: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    darkTouchable_AmazeMe: {
      flex: 1,
      backgroundColor: '#1f1f1f',
    },
  });