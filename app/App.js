// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen'; // Adjust path as needed
import ChallengeScreen from './ChallengeScreen'; // Adjust path as needed
import Header from './components/Header'; 


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
        <Header />
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Challenge" component={ChallengeScreen} />
            </Stack.Navigator>
        <BottomNavBar />
    </NavigationContainer>
  );
};

export default App;
