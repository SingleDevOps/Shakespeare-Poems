import React, { useState , useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableHighlight } from 'react-native';
import { faker } from '@faker-js/faker';
import { Button, SearchBar } from 'react-native-elements'
import PoemsData from '../Poems.json';
import { Fonts } from "../android/app/src/constants/fonts";
const generateDummyPoems = () => (
  Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    title: faker.lorem.words(5),
    Poem: faker.lorem.paragraphs(3),
    author: faker.person.fullName(),
  }))
);

// const PoemsData = generateDummyPoems();

// const ITEMS_PER_PAGE = 10;

const Poems = ({ navigation , route }: { navigation: any , route:any}) => {
  useEffect(()=>{
    navigation.setOptions({
      title:route.name,
      headerTitleStyle:{
        fontFamily:Fonts.NotoSerif.Regular,
      },
    });
  }, [navigation,route]);

  const [searchQuery, setsearchQuery] = useState('');
  const [filteredPoems, setfilteredPoems] = useState(PoemsData);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleSearch = (query: string): void => {
    setsearchQuery(query);
    if (query === '') {
      setfilteredPoems(PoemsData);
    }
    else {
      const filtered = PoemsData.filter(Poem =>
        Poem.title.toLowerCase().includes(query.toLowerCase()) ||
        Poem.author.toLowerCase().includes(query.toLowerCase()) ||
        Poem.poem.toLowerCase().includes(query.toLowerCase())
      );
      setfilteredPoems(filtered);
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder='    Search Poems...'
        placeholderTextColor="black"
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInputContainer}
        inputStyle={styles.searchInput}
        value={searchQuery}
        onChangeText={handleSearch}
        searchIcon={false}
      />
      <FlatList
        data={filteredPoems}
        renderItem={({ item }) => (
          <TouchableHighlight
            onLongPress={()=>{}}
            onPress={() => navigation.navigate('PoemDetail', { text: item.poem, title: item.title })}
            style={styles.PoemItem}
            underlayColor={"#d3d3d3"}
            activeOpacity={0.6}
          >
            <View>
              <Text style={styles.PoemTitleText}>{item.title}</Text>
              <Text style={styles.PoemAuthorText}>{item.author}</Text>
              <Text>{"\n"}</Text>
            </View>
          </TouchableHighlight>
        )}
        keyExtractor={(item, index) => index.toString()}
      ></FlatList>
    </View>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  searchContainer: {
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 0,
    borderTopWidth: 0,
    marginTop:10,
    padding: 10,
  },
  searchInputContainer: {
    backgroundColor: '#fff',
    borderRadius: 30,
  },
  searchInput: {
    fontFamily: Fonts.NotoSerif.Regular,
    color: '#000',
  },
  PoemItem: {
    fontFamily: Fonts.NotoSerif.Regular,
    backgroundColor: '#fff',
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
  PoemAuthorText:{ 
    fontFamily: Fonts.NotoSerif.Regular,
    fontSize: 14, 
    paddingLeft: 10, 
    paddingRight: 10, 
    color: 'black', 
  },
});

export default Poems;