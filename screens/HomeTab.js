import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react';
import { Appbar, BottomNavigation, FAB, useTheme, Searchbar, Button, IconButton } from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const BOTTOM_APPBAR_HEIGHT = 80;
const MEDIUM_FAB_HEIGHT = 56;

const App = () => {

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);

  const theme = useTheme();

  return (

    <SafeAreaProvider>
    <SafeAreaView>
      <View styles={styles.container}>
        <Text style={styles.head} variant="displayMedium">Row Row Row Our Boat</Text>
        <IconButton icon="rowing" size={70} color='blue' styles={{align: 'center'}}/>
      </View>
    </SafeAreaView>
    </SafeAreaProvider>


  );
    
};




const styles = StyleSheet.create({
  head: {
    marginTop: 170,
    textAlign: 'center',
    fontSize: 35,
    fontWeight: '500',
    margin: 50,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },

  item: {
    marginTop: 245,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  search: {
    marginTop: -30,
    position: 'relative',
    backgroundColor: 'orange',
    textDecorationColor: 'white',
    shadowColor: 'orange',
    padding: 5,
    margin: 10,
  },
  button: {
    padding: 5,
    margin: 10,
    
    
  }
});

export default App;
