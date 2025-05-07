import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  FlatList,
  useColorScheme,
} from 'react-native';
import { getAllLikedPoem, deletePoem } from '../../src/services/database';
import { Fonts } from '../../android/app/src/constants/fonts';
import { SearchBar } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import { LikedPoem_Styles as styles } from '../stylesheets/LikedPoem_StyleSheet';
import { NavigationProps, Poem } from '../types/navigation';
import LikedPoemItem from '../components/LikedPoemItem';

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
        onChangeText={(text: string) => handleSearch(text)}
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
