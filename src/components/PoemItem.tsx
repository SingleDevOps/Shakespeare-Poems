import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { Poems_Styles as styles } from '../stylesheets/Poems_StyleSheet';
import { Poem } from '../types/navigation';

interface PoemItemProps {
  item: Poem;
  onPress: () => void;
  colorScheme: 'light' | 'dark';
}

const PoemItem: React.FC<PoemItemProps> = ({ item, onPress, colorScheme }) => (
  <TouchableHighlight
    onPress={onPress}
    style={colorScheme === 'light' ? styles.PoemItem : styles.darkPoemItem}
    underlayColor={colorScheme === 'light' ? '#d3d3d3' : '#333333'}
    activeOpacity={0.6}
  >
    <View>
      <Text style={colorScheme === 'light' ? styles.PoemTitleText : styles.darkPoemTitleText}>
        {item.title}
      </Text>
      <Text style={colorScheme === 'light' ? styles.PoemAuthorText : styles.darkPoemAuthorText}>
        {item.author}
      </Text>
      <Text>{'\n'}</Text>
    </View>
  </TouchableHighlight>
);

export default PoemItem;
