// StudyPackageStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SubjectProvider } from './StudyPackage/SubjectContext';
import { createStackNavigator } from '@react-navigation/stack';
import VideoList from './StudyPackage/VideoLists';
import VideoPlayer from './StudyPackage/VideoPlayer';
import StudyPackageC from './StudyPackage/Chinese/StudyPackageC';

import StudyPackageM from './StudyPackage/Math/StudyPackageM';
import StudyPackageS from './StudyPackage/Science/StudyPackageS';
import StudyPackageO from './StudyPackage/Other/StudyPackageO';
import StudyPackageE from './StudyPackage/English/StudyPackageE';
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
      
          <MainStack.Screen name="StudyPackageC" component={StudyPackageC} />
          <MainStack.Screen name="Topics" component={Topics} />
          <MainStack.Screen name="VideoList" component={VideoList} />
          <MainStack.Screen name="VideoPlayer" component={VideoPlayer} />
          <MainStack.Screen name="StudyPackageE" component={StudyPackageE} />  
          <MainStack.Screen name="StudyPackageM" component={StudyPackageM} />
          <MainStack.Screen name="StudyPackageS" component={StudyPackageS} />
          <MainStack.Screen name="StudyPackageO" component={StudyPackageO} />
        </MainStack.Navigator>
      </SubjectProvider>
      
   
  
  );
}  

export default StudyPackageStack;
