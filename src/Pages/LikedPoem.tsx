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

const LikedPoem = ({ navigation, route }: { navigation: any; route: any; }) => {
  const colorScheme = useColorScheme();
  const [likedPoems, setLikedPoems] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredPoems, setFilteredPoems] = useState([]);

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

  const handleSearch = (query: string): void => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredPoems(likedPoems);
    } else {
      const filtered = likedPoems.filter(
        (Poem) => //removed : { title: string; poet: string; poem: string; }
          Poem.title.toLowerCase().includes(query.toLowerCase()) ||
          Poem.poet.toLowerCase().includes(query.toLowerCase()) ||
          Poem.poem.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPoems(filtered);
    }
  };

  const handleUnlike = async (id: number) => {
    try {
      await deletePoem(id);
      setLikedPoems(likedPoems.filter((poem) => poem.id !== id)); //removed : { id: number; }
      setFilteredPoems(filteredPoems.filter((poem) => poem.id !== id)); //removed : { id: number; }
      console.log(`Poem with ID ${id} unliked successfully.`);
    } catch (error) {
      console.error(`Error unliking poem with ID ${id}:`, error);
    }
  };

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
        searchIcon={false}
      />
      <FlatList
        data={filteredPoems} //removed .length > 0 ? filteredPoems : []
        renderItem={({ item }) => (
          <TouchableHighlight
            onLongPress={() => handleUnlike(item.id)}
            onPress={() => navigation.navigate('PoemDetail', { poem: item })}
            style={colorScheme === 'light' ? styles.PoemItem : styles.darkPoemItem}
            underlayColor={colorScheme === 'light' ? '#d3d3d3' : '#333333'}
            activeOpacity={0.6}
            >
            <View>
              <Text style={colorScheme === 'light' ? styles.PoemTitleText : styles.darkPoemTitleText}>
                {item.title} {/*removed ? */}
              </Text>
              <Text style={colorScheme === 'light' ? styles.PoemAuthorText : styles.darkPoemAuthorText}>
                {item.poet}
              </Text>
              <Text>{'\n'}</Text>
            </View>
          </TouchableHighlight>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default LikedPoem;
