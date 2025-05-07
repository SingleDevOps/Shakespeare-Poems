import React, { useEffect } from 'react';
import {
  ScrollView,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import { Fonts } from '../../android/app/src/constants/fonts';
import { PoemDetail_styles as styles } from '../stylesheets/PoemDetail_StyleSheet';
import { NavigationProps, Poem } from '../types/navigation';
import { SaveButton } from '../components/SaveButton';
import FontSizeButton from '../components/FontSizeButton';
import { usePoemSave } from '../hooks/usePoemSave';
import { useFontSize } from '../hooks/useFontSize';

const PoemDetail: React.FC<NavigationProps> = ({ route, navigation }) => {
  const colorScheme = useColorScheme();
  const poem = route.params?.poem as Poem;
  const { saved, handleSavedPress } = usePoemSave(poem);
  const { fontSize, addFontSize, reduceFontSize } = useFontSize(styles.PoemText.fontSize);

  useEffect(() => {
    navigation.setOptions({
      title: poem.title,
      headerTitleStyle: {
        fontFamily: Fonts.NotoSerif.Regular,
        color: colorScheme === 'light' ? 'black' : 'white',
      },
      headerTintColor: colorScheme === 'light' ? 'black' : 'red',
      headerStyle: {
        backgroundColor: colorScheme === 'light' ? 'white' : '#121212',
      },
      headerRight: () => (
        <SaveButton
          saved={saved}
          onPress={handleSavedPress}
          colorScheme={colorScheme as 'light' | 'dark'}
        />
      ),
    });
  }, [navigation, poem.title, colorScheme, saved, handleSavedPress]);

  return (
    <View style={colorScheme === 'light' ? styles.container : styles.darkContainer}>
      <ScrollView
        contentContainerStyle={
          colorScheme === 'light'
            ? styles.PoemTextContainer
            : styles.darkPoemTextContainer
        }
      >
        {poem.poem.split('\n').map((line: string, index: number) => (
          <Text
            key={index}
            style={[
              colorScheme === 'light' ? styles.PoemText : styles.darkPoemText,
              { fontSize },
            ]}
          >
            {line}
            {'\n'}
          </Text>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <FontSizeButton
          label="Font Size -"
          onPress={reduceFontSize}
          colorScheme={colorScheme as 'light' | 'dark'}
        />
        <FontSizeButton
          label="Font Size +"
          onPress={addFontSize}
          colorScheme={colorScheme as 'light' | 'dark'}
        />
      </View>
    </View>
  );
};

export default PoemDetail;
