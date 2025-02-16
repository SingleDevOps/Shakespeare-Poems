import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableHighlight, useColorScheme, ActivityIndicator } from 'react-native';
import { SearchBar } from 'react-native-elements';
import PoemsData from '../JsonFiles/Poems.json';
import { Fonts } from "../android/app/src/constants/fonts";

// import { faker } from '@faker-js/faker';
// const generateDummyPoems = () => (
//   Array.from({ length: 20 }, (_, index) => ({
//     id: index + 1,
//     title: faker.lorem.words(5),
//     poem: faker.lorem.paragraphs(3),
//     author: faker.person.fullName(),
//   }))
// );

const Poems = ({ navigation, route }: { navigation: any, route: any }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPoems, setFilteredPoems] = useState(PoemsData);

  //-------------Waiting to implement the paged display---------------//
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [paginatedPoems, setpaginatedPoems] = useState<typeof PoemsData>([]);
  const poemCount = PoemsData.length;
  const ITEMS_PER_PAGE = 20;
  //-------------Waiting to implement the paged display---------------//

  const colorScheme = useColorScheme();
  


  useEffect(() => {
    navigation.setOptions({
      title: route.name,
      headerTitleStyle: {
        fontFamily: Fonts.NotoSerif.Regular,
        color: colorScheme === 'light' ? 'black' : 'white',
      },
      headerTintColor: colorScheme === "light" ? "black" : "red",
      headerStyle: {
        backgroundColor: colorScheme === 'light' ? '#f0f0f0' : '#121212',
      },
      headerRight: () => {}
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
      <SearchBar
        placeholder='    Search Poems...'
        placeholderTextColor={colorScheme === 'light' ? "black" : "white"}
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
            onPress={() => navigation.navigate('PoemDetail', {poem:item})}
            style={colorScheme === 'light' ? styles.PoemItem : styles.darkPoemItem}
            underlayColor={colorScheme === 'light' ? "#d3d3d3" : "#333333"}
            activeOpacity={0.6}
          >
            <View>
              <Text style={colorScheme === 'light' ? styles.PoemTitleText : styles.darkPoemTitleText}>{item.title}</Text>
              <Text style={colorScheme === 'light' ? styles.PoemAuthorText : styles.darkPoemAuthorText}>{item.author}</Text>
              <Text>{"\n"}</Text>
            </View>
          </TouchableHighlight>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  darkContainer: {
    flex: 1,
    backgroundColor: '#121212',
  },
  searchContainer: {
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 0,
    borderTopWidth: 0,
    marginTop: 10,
    padding: 10,
  },
  darkSearchContainer: {
    backgroundColor: '#121212',
    borderBottomWidth: 0,
    borderTopWidth: 0,
    marginTop: 10,
    padding: 10,
  },
  searchInputContainer: {
    backgroundColor: '#fff',
    borderRadius: 30,
  },
  darkSearchInputContainer: {
    backgroundColor: '#1f1f1f',
    borderRadius: 30,
  },
  searchInput: {
    fontFamily: Fonts.NotoSerif.Regular,
    color: '#000',
  },
  darkSearchInput: {
    fontFamily: Fonts.NotoSerif.Regular,
    color: '#fff',
  },
  PoemItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 9,
    elevation: 5,
  },
  darkPoemItem: {
    backgroundColor: '#1f1f1f',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 9,
    elevation: 5,
  },
  PoemTitleText: {
    fontFamily: Fonts.NotoSerif.Regular,
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 10,
    color: 'black',
  },
  darkPoemTitleText: {
    fontFamily: Fonts.NotoSerif.Regular,
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 10,
    color: 'white',
  },
  PoemAuthorText: {
    fontFamily: Fonts.NotoSerif.Regular,
    fontSize: 14,
    paddingLeft: 10,
    paddingRight: 10,
    color: 'black',
  },
  darkPoemAuthorText: {
    fontFamily: Fonts.NotoSerif.Regular,
    fontSize: 14,
    paddingLeft: 10,
    paddingRight: 10,
    color: 'white',
  },
});

export default Poems;