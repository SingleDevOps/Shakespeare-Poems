import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar, View, Text, FlatList, TouchableHighlight, useColorScheme } from 'react-native';
import { SearchBar } from 'react-native-elements';
import PoemsData from '../../JsonFiles/Poems.json';
import { Fonts } from '../../android/app/src/constants/fonts';
import { Poems_Styles as styles } from '../stylesheets/Poems_StyleSheet';
import { NavigationProps, Poem } from '../types/navigation';

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

const Poems: React.FC<NavigationProps> = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPoems, setFilteredPoems] = useState<Poem[]>(
    PoemsData.map(poem => ({ ...poem, id: poem.id.toString() }))
  );
  const colorScheme = useColorScheme();

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
      setFilteredPoems(PoemsData.map(poem => ({ ...poem, id: poem.id.toString() })));
    } else {
      const filtered = PoemsData.filter(poem =>
        poem.title.toLowerCase().includes(query.toLowerCase()) ||
        poem.author.toLowerCase().includes(query.toLowerCase()) ||
        poem.poem.toLowerCase().includes(query.toLowerCase())
      ).map(poem => ({ ...poem, id: poem.id.toString() }));
      setFilteredPoems(filtered);
    }
  }, []);

  const renderItem = useCallback(({ item }: { item: Poem }) => (
    <PoemItem
      item={item}
      onPress={() => navigation.navigate('PoemDetail', { poem: item })}
      colorScheme={colorScheme as 'light' | 'dark'}
    />
  ), [navigation, colorScheme]);

  return (
    <View style={colorScheme === 'light' ? styles.container : styles.darkContainer}>
      <StatusBar
        backgroundColor={colorScheme === 'light' ? '#f0f0f0' : '#1f1f1f'}
        showHideTransition={'fade'}
        animated={true}
      />
      <SearchBar
        placeholder="    Search Poems..."
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
        keyExtractor={(_item, index) => index.toString()}
      />
    </View>
  );
};

export default Poems;
