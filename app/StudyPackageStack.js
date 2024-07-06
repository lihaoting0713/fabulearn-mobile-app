// StudyPackageStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SubjectProvider } from './StudyPackage/SubjectContext';
import { createStackNavigator } from '@react-navigation/stack';
import VideoList from './StudyPackage/VideoLists';
import VideoPlayer from './StudyPackage/VideoPlayer';
import StudyPackage from './StudyPackage/StudyPackage';
import Topics from './StudyPackage/Topics';
import { Provider } from 'react-redux';
import store from './Store'; // Ensure correct import path
import HomeScreen from './HomeScreen';



const MainStack = createNativeStackNavigator();
const SettingStack = createNativeStackNavigator();

function StudyPackageStack() {
  return (
    
      <SubjectProvider>
        <MainStack.Navigator      
          initialRouteName="StudyPackageC" 
          screenOptions={{
        
          headerShown:false
          }}
        >
      
          <MainStack.Screen name="StudyPackage" component={StudyPackage} />
          <MainStack.Screen name="Topics" component={Topics} />
          <MainStack.Screen name="VideoList" component={VideoList} />
          <MainStack.Screen name="VideoPlayer" component={VideoPlayer} />
       
        </MainStack.Navigator>
      </SubjectProvider>
      
   
  
  );
}  

export default StudyPackageStack;
