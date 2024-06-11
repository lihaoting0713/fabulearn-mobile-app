// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen'; // Ensure correct path
import ChallengeScreen from './Challenge/ChallengeScreen'; // Ensure correct path
import VideoStack from './VideoStack'; // Ensure correct path
import Header from './components/Header'; // Ensure correct path
import BottomNavBar from './components/BottomNavBar'; // Ensure correct path
import StartChallenge from './Challenge/StartChallenge1';
import AccountStack from './AccountStack';
import StudyPackageStack from './StudyPackageStack';
import Notification from './Notifications';

const Stack = createNativeStackNavigator();

const App = () => {
  
  return (
    <NavigationContainer>
      <Header />
      
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Challenge" component={ChallengeScreen} />
        <Stack.Screen name="VideoStack" component={VideoStack} />
        <Stack.Screen name="StartChallenge" component={StartChallenge} />
        <Stack.Screen name="AccountStack" component={AccountStack} />
        <Stack.Screen name="StudyPackageStack" component={StudyPackageStack} />
        <Stack.Screen name="Notification" component={Notification} />
      </Stack.Navigator>
      <BottomNavBar />
    </NavigationContainer>
  );
};

export default App;
