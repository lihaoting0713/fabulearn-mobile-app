// StudyPackageStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createStackNavigator } from '@react-navigation/stack';
import LanguageAwareness from './StudyPackage/LanguageAwareness'; 
import StudyPackage from './StudyPackage/StudyPackage';
import VideoList from './StudyPackage/VideoLists';
import VideoPlayer from './StudyPackage/VideoPlayer';

const MainStack = createNativeStackNavigator();
const SettingStack = createNativeStackNavigator();

function StudyPackageStack() {
  return (
    
      <MainStack.Navigator initialRouteName="StudyPackage" screenOptions={{headerShown:false}}>
        <MainStack.Screen name="StudyPackage" component={StudyPackage} />
        <MainStack.Screen name="LanguageAwareness" component={LanguageAwareness} />
        <MainStack.Screen name="VideoList" component={VideoList} />
        <MainStack.Screen name="VideoPlayer" component={VideoPlayer} />       
      </MainStack.Navigator>
  
  );
}  

export default StudyPackageStack;
