import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MainTabs from './src/navigation/MainTabs';

function App() {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
    </>
  );
}

export default App;
