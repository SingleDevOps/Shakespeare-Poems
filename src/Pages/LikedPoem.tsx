import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableHighlight,
  useColorScheme,
} from 'react-native';
import { getAllLikedPoem, deletePoem } from '../../src/services/database';
import { Fonts } from '../../android/app/src/constants/fonts';
import { SearchBar } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import { LikedPoem_Styles as styles } from '../stylesheets/LikedPoem_StyleSheet';
import { NavigationProps, Poem } from '../types/navigation';

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

const LikedPoem: React.FC<NavigationProps> = ({ navigation, route }) => {
  const colorScheme = useColorScheme();
  const [likedPoems, setLikedPoems] = useState<Poem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPoems, setFilteredPoems] = useState<Poem[]>([]);

  const loadLikedPoems = useCallback(async () => {
    try {
      const allLikedPoems = await getAllLikedPoem();
      setLikedPoems(allLikedPoems);
      setFilteredPoems(allLikedPoems);
    } catch (error) {
      console.error('Error loading liked poems:', error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadLikedPoems();
    }, [loadLikedPoems])
  );

  useEffect(() => {
    navigation.setOptions({
      title: route.name,
      headerTitleStyle: {
        fontFamily: Fonts.NotoSerif.Regular,
        color: colorScheme === 'light' ? 'black' : 'white',
      },
      headerTintColor: colorScheme === 'light' ? 'black' : 'red',
      headerStyle: {
        backgroundColor: colorScheme === 'light' ? '#f0f0f0' : '#121212',
      },
    });
  }, [navigation, route, colorScheme]);

  const handleSearch = useCallback((query: string): void => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredPoems(likedPoems);
    } else {
      const filtered = likedPoems.filter(
        poem =>
          poem.title.toLowerCase().includes(query.toLowerCase()) ||
          poem.author.toLowerCase().includes(query.toLowerCase()) ||
          poem.poem.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPoems(filtered);
    }
  }, [likedPoems]);

  const handleUnlike = useCallback(async (id: string) => {
    try {
      await deletePoem(id);
      setLikedPoems(prevPoems => prevPoems.filter(poem => poem.id !== id));
      setFilteredPoems(prevPoems => prevPoems.filter(poem => poem.id !== id));
      console.log(`Poem with ID ${id} unliked successfully.`);
    } catch (error) {
      console.error(`Error unliking poem with ID ${id}:`, error);
    }
  }, []);

  const renderItem = useCallback(({ item }: { item: Poem }) => (
    <LikedPoemItem
      item={item}
      onPress={() => navigation.navigate('PoemDetail', { poem: item })}
      onLongPress={() => handleUnlike(item.id)}
      colorScheme={colorScheme as 'light' | 'dark'}
    />
  ), [navigation, handleUnlike, colorScheme]);

  return (
    <View style={colorScheme === 'light' ? styles.container : styles.darkContainer}>
      <SearchBar
        placeholder="    Search Liked Poems..."
        placeholderTextColor={colorScheme === 'light' ? 'black' : 'white'}
        containerStyle={colorScheme === 'light' ? styles.searchContainer : styles.darkSearchContainer}
        inputContainerStyle={colorScheme === 'light' ? styles.searchInputContainer : styles.darkSearchInputContainer}
        inputStyle={colorScheme === 'light' ? styles.searchInput : styles.darkSearchInput}
        value={searchQuery}
        onChangeText={handleSearch}
        searchIcon={{ name: 'search' }}
      />
      <FlatList
        data={filteredPoems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default LikedPoem;
