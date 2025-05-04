import React, { useState, useEffect } from 'react';
import { StatusBar, View, Text, FlatList, TouchableHighlight, useColorScheme } from 'react-native';
import { SearchBar } from 'react-native-elements';
import PoemsData from '../../JsonFiles/Poems.json';
import { Fonts } from '../../android/app/src/constants/fonts';
import { Poems_Styles as styles } from '../stylesheets/Poems_StyleSheet';

const Poems = ({ navigation, route }: { navigation: any, route: any }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPoems, setFilteredPoems] = useState(PoemsData);

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
      headerRight: () => {},
    });
  }, [navigation, route, colorScheme]);




  const handleSearch = (query: string): void => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredPoems(PoemsData);
    } else {
      const filtered = PoemsData.filter(Poem =>
        Poem.title.toLowerCase().includes(query.toLowerCase()) ||
        Poem.author.toLowerCase().includes(query.toLowerCase()) ||
        Poem.poem.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPoems(filtered);
    }
  };

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
        onChangeText={handleSearch}
        searchIcon={false}
      />
      <FlatList
        data={filteredPoems}
        renderItem={({ item }) => (
          <TouchableHighlight
            onLongPress={() => { }}
            onPress={() => navigation.navigate('PoemDetail', { poem: item })}
            style={colorScheme === 'light' ? styles.PoemItem : styles.darkPoemItem}
            underlayColor={colorScheme === 'light' ? '#d3d3d3' : '#333333'}
            activeOpacity={0.6}
          >
            <View>
              <Text style={colorScheme === 'light' ? styles.PoemTitleText : styles.darkPoemTitleText}>{item.title}</Text>
              <Text style={colorScheme === 'light' ? styles.PoemAuthorText : styles.darkPoemAuthorText}>{item.author}</Text>
              <Text>{'\n'}</Text>
            </View>
          </TouchableHighlight>
        )}
        keyExtractor={(_item, index) => index.toString()}
      />
    </View>
  );
};


export default Poems;
