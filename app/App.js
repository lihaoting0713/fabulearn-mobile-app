// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen'; // Ensure correct path
import ChallengeScreen from './ChallengeScreen'; // Ensure correct path
import VideoLibrary from './VideoLibrary';
import Header from './components/Header'; // Ensure correct path
import BottomNavBar from './components/BottomNavBar'; // Ensure correct path
import StartChallenge from './StartChallenge';
import AccountStack from './AccountStack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Header />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Challenge" component={ChallengeScreen} />
        <Stack.Screen name="VideoLibrary" component={VideoLibrary} />
        <Stack.Screen name="StartChallenge" component={StartChallenge} />
        <Stack.Screen name="AccountStack" component={AccountStack} />
      </Stack.Navigator>
      <BottomNavBar />
    </NavigationContainer>
  );
};

export default App;
