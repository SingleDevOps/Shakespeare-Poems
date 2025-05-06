import React, { useEffect } from 'react';
import {createTable} from '../../src/services/database';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainPage from '../Pages/MainPage';
import Poems from '../Pages/Poems';
import PoemDetail from '../Pages/PoemDetail';
import AmazeMe from '../Pages/AmazeMe';
import LikedPoem from '../Pages/LikedPoem';
const setupDatabase = async () => {
  try{
    await createTable();
  }
  catch(error){
    console.log('Failed To Create Database Table');
  }
};

const Stack = createNativeStackNavigator();
const PageContainer = () => {
    useEffect(()=>{
      setupDatabase();
    }, []);
    return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Shakespeare Poems">
        <Stack.Screen name="Shakespeare Poems" component={MainPage} />
        <Stack.Screen name="Poems" component={Poems} />
        <Stack.Screen name="PoemDetail" component={PoemDetail} />
        <Stack.Screen name="AmazeMe" component={AmazeMe} />
        <Stack.Screen name="LikedPoem" component={LikedPoem} />
      </Stack.Navigator>
    </NavigationContainer>
    );
  };

export default PageContainer;
