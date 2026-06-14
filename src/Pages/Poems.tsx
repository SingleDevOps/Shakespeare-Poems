import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar, View, FlatList, useColorScheme } from 'react-native';
import { SearchBar } from 'react-native-elements';
import PoemsData from '../../JsonFiles/Poems.json';
import { Fonts } from '../constants/fonts';
import { Poems_Styles as styles } from '../stylesheets/Poems_StyleSheet';
import { NavigationProps, Poem } from '../types/navigation';
import PoemItem from '../components/PoemItem';

const allPoems: Poem[] = PoemsData.map(poem => ({ ...poem, id: poem.id.toString() }));

const Poems: React.FC<NavigationProps> = ({ navigation, route }) => {
  const colorScheme = useColorScheme() ?? 'light';
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPoems, setFilteredPoems] = useState<Poem[]>(allPoems);

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

  const handleSearch = useCallback((query?: string): void => {
    const q = query ?? '';
    setSearchQuery(q);
    if (q === '') {
      setFilteredPoems(allPoems);
    } else {
      const filtered = allPoems.filter(poem =>
        poem.title.toLowerCase().includes(q.toLowerCase()) ||
        poem.author.toLowerCase().includes(q.toLowerCase()) ||
        poem.poem.toLowerCase().includes(q.toLowerCase()),
      );
      setFilteredPoems(filtered);
    }
  }, []);

  const renderItem = useCallback(({ item }: { item: Poem }) => (
    <PoemItem
      item={item}
      onPress={() => navigation.navigate('PoemDetail', { poem: item })}
      colorScheme={colorScheme}
    />
  ), [navigation, colorScheme]);

  return (
    <View style={colorScheme === 'light' ? styles.container : styles.darkContainer}>
      <StatusBar
        backgroundColor={colorScheme === 'light' ? '#f0f0f0' : '#1f1f1f'}
        showHideTransition={'fade'}
        animated={true}
      />
      {/* @ts-expect-error react-native-elements SearchBar type issue */}
      <SearchBar
        placeholder="    Search Poems..."
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

export default Poems;
