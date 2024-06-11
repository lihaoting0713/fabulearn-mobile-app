// ChallengeStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createStackNavigator } from '@react-navigation/stack';
import ChallengeScreen from './Challenge/ChallengeScreen'; 
import StartChallenge from './Challenge/StartChallenge';
import StartChallenge1 from './Challenge/StartChallenge1';
import StartChallenge2 from './Challenge/StartChallenge2';
import StartChallenge3 from './Challenge/StartChallenge3';


const MainStack = createNativeStackNavigator();
const SettingStack = createNativeStackNavigator();

function ChallengeStack() {
  return (
    
      <MainStack.Navigator initialRouteName="ChallengeScreen" screenOptions={{headerShown:false}}>
        <MainStack.Screen name="ChallengeScreen" component={ChallengeScreen} />
        <MainStack.Screen name="StartChallenge" component={StartChallenge} />
        <MainStack.Screen name="StartChallenge1" component={StartChallenge1} />
        <MainStack.Screen name="StartChallenge2" component={StartChallenge2} />
        <MainStack.Screen name="StartChallenge3" component={StartChallenge3} />
      </MainStack.Navigator>
  
  );
}  

export default ChallengeStack;