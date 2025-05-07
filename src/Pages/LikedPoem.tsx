import React, { useCallback, useEffect } from 'react';
import {
  View,
  FlatList,
  useColorScheme,
} from 'react-native';
import { Fonts } from '../../android/app/src/constants/fonts';
import { SearchBar } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import { LikedPoem_Styles as styles } from '../stylesheets/LikedPoem_StyleSheet';
import { NavigationProps, Poem } from '../types/navigation';
import LikedPoemItem from '../components/LikedPoemItem';
import { useSearch } from '../hooks/useSearch';
import { useLikedPoems } from '../hooks/useLikedPoems';

const LikedPoem: React.FC<NavigationProps> = ({ navigation, route }) => {
  const colorScheme = useColorScheme();
  const { likedPoems, loadLikedPoems, handleUnlike, setLikedPoems } = useLikedPoems();
  const { searchQuery, filteredItems: filteredPoems, handleSearch, setFilteredItems } = useSearch(likedPoems);

  useFocusEffect(
    useCallback(() => {
      loadLikedPoems().then(poems => {
        setLikedPoems(poems);
        setFilteredItems(poems);
      });
    }, [loadLikedPoems, setLikedPoems, setFilteredItems])
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
