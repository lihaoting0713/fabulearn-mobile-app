// StudyPackageStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SubjectProvider } from './StudyPackage/SubjectContext';
import { createStackNavigator } from '@react-navigation/stack';
import LanguageAwareness from './StudyPackage/English/LanguageAwareness'; 
import VideoList from './StudyPackage/VideoLists';
import VideoPlayer from './StudyPackage/VideoPlayer';
import Grammar from './StudyPackage/English/Grammar';
import ReadingandWriting from './StudyPackage/English/ReadingandWriting';
import PhrasesClausesandSentences from './StudyPackage/English/PhrasesClausesandSentences';
import CapitalisationandPunctuation from './StudyPackage/English/CapitalisationandPunctuation';
import StudyPackageC from './StudyPackage/Chinese.js/StudyPackageC';
import StudyPackageE from './StudyPackage/English/StudyPackageE';
import SubjectContext from './StudyPackage/SubjectContext';
import Writing from './StudyPackage/Chinese.js/Writing';
import Reading from './StudyPackage/Chinese.js/Reading';


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
        <MainStack.Screen name="LanguageAwareness" component={LanguageAwareness} />
        <MainStack.Screen name="Grammar" component={Grammar} />
        <MainStack.Screen name="ReadingandWriting" component={ReadingandWriting} />
        <MainStack.Screen name="PhrasesClausesandSentences" component={PhrasesClausesandSentences} />
        <MainStack.Screen name="CapitalisationandPunctuation" component={CapitalisationandPunctuation} />
        <MainStack.Screen name="VideoList" component={VideoList} />
        <MainStack.Screen name="VideoPlayer" component={VideoPlayer} />

        <MainStack.Screen name="StudyPackageE" component={StudyPackageE} />   
        <MainStack.Screen name="Writing" component={Writing} />
        <MainStack.Screen name="Reading" component={Reading} />    
       </MainStack.Navigator>
      </SubjectProvider>
  
  );
}  

export default StudyPackageStack;
