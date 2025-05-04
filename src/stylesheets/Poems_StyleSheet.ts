import { StyleSheet } from 'react-native';
import { Fonts } from '../../android/app/src/constants/fonts';

export const Poems_Styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f0f0',
    },
    darkContainer: {
      flex: 1,
      backgroundColor: '#121212',
    },
    searchContainer: {
      backgroundColor: '#f0f0f0',
      borderBottomWidth: 0,
      borderTopWidth: 0,
      marginTop: 10,
      padding: 10,
    },
    darkSearchContainer: {
      backgroundColor: '#121212',
      borderBottomWidth: 0,
      borderTopWidth: 0,
      marginTop: 10,
      padding: 10,
    },
    searchInputContainer: {
      backgroundColor: '#fff',
      borderRadius: 30,
    },
    darkSearchInputContainer: {
      backgroundColor: '#1f1f1f',
      borderRadius: 30,
    },
    searchInput: {
      fontFamily: Fonts.NotoSerif.Regular,
      color: '#000',
    },
    darkSearchInput: {
      fontFamily: Fonts.NotoSerif.Regular,
      color: '#fff',
    },
    PoemItem: {
      backgroundColor: '#fff',
      padding: 15,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 9,
      elevation: 5,
    },
    darkPoemItem: {
      backgroundColor: '#1f1f1f',
      padding: 15,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 9,
      elevation: 5,
    },
    PoemTitleText: {
      fontFamily: Fonts.NotoSerif.Regular,
      fontSize: 20,
      paddingLeft: 10,
      paddingRight: 10,
      color: 'black',
    },
    darkPoemTitleText: {
      fontFamily: Fonts.NotoSerif.Regular,
      fontSize: 20,
      paddingLeft: 10,
      paddingRight: 10,
      color: 'white',
    },
    PoemAuthorText: {
      fontFamily: Fonts.NotoSerif.Regular,
      fontSize: 14,
      paddingLeft: 10,
      paddingRight: 10,
      color: 'black',
    },
    darkPoemAuthorText: {
      fontFamily: Fonts.NotoSerif.Regular,
      fontSize: 14,
      paddingLeft: 10,
      paddingRight: 10,
      color: 'white',
    },
  });
  