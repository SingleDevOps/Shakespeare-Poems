import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { LikedPoem_Styles as styles } from '../stylesheets/LikedPoem_StyleSheet';
import { Poem } from '../types/navigation';

interface LikedPoemItemProps {
  item: Poem;
  onPress: () => void;
  onLongPress: () => void;
  colorScheme: 'light' | 'dark';
}

const LikedPoemItem: React.FC<LikedPoemItemProps> = ({
  item,
  onPress,
  onLongPress,
  colorScheme,
}) => (
  <TouchableHighlight
    onLongPress={onLongPress}
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

export default LikedPoemItem; 