// ChallengeStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createStackNavigator } from '@react-navigation/stack';
import ChallengeScreen from './Challenge/ChallengeScreen'; 
import StartChallenge from './Challenge/StartChallenge';
import StartChallenge0 from './Challenge/StartChallenge0';
import StartChallenge1 from './Challenge/StartChallenge1';
import StartChallenge2 from './Challenge/StartChallenge2';
import StartChallenge3 from './Challenge/StartChallenge3';
import AcceptChallenge from './Challenge/AcceptChallenge';
import AcceptChallengeDetails from './Challenge/AcceptChallengeDetails';
import ContinuingChallenge from './Challenge/ContinuingChallenge';
import ContinuingChallengeDetails from './Challenge/ContinuingChallengeDetails';
import FinishedChallenge from './Challenge/FinishedChallenge';
import FinishedChallengeDetails from './Challenge/FinishedChallengeDetails';
import StartedChallenge from './Challenge/StartedChallenge';
import StartedChallengeDetails from './Challenge/StartedChallengeDetails';
import SemiCircleProgressBar from './Challenge/SemiCircleProgressBar';
import PieChartWithLabels from './Challenge/PieChartWithLabels';
import StartedChallengeSummary from './Challenge/StartedChallengeSummary';


const MainStack = createNativeStackNavigator();
const SettingStack = createNativeStackNavigator();

function ChallengeStack() {
  return (
    
      <MainStack.Navigator initialRouteName="ChallengeScreen" screenOptions={{headerShown:false}}>
        <MainStack.Screen name="ChallengeScreen" component={ChallengeScreen} />
        <MainStack.Screen name="StartChallenge0" component={StartChallenge0} />
        <MainStack.Screen name="StartChallenge" component={StartChallenge} />
        <MainStack.Screen name="StartChallenge1" component={StartChallenge1} />
        <MainStack.Screen name="StartChallenge2" component={StartChallenge2} />
        <MainStack.Screen name="StartChallenge3" component={StartChallenge3} />
        <MainStack.Screen name="AcceptChallenge" component={AcceptChallenge} />
        <MainStack.Screen name="AcceptChallengeDetails" component={AcceptChallengeDetails} />
        <MainStack.Screen name="ContinuingChallenge" component={ContinuingChallenge} />
        <MainStack.Screen name="ContinuingChallengeDetails" component={ContinuingChallengeDetails} />
        <MainStack.Screen name="FinishedChallenge" component={FinishedChallenge} />
        <MainStack.Screen name="FinishedChallengeDetails" component={FinishedChallengeDetails} />
        <MainStack.Screen name="StartedChallenge" component={StartedChallenge} />
        <MainStack.Screen name="SemiCircleProgressBar" component={SemiCircleProgressBar}/>
        <MainStack.Screen name="PieChartWithLabels" component={PieChartWithLabels} />
        <MainStack.Screen name="StartedChallengeDetails" component={StartedChallengeDetails} />
        <MainStack.Screen name="StartedChallengeSummary" component={StartedChallengeSummary} />
      </MainStack.Navigator>
  
  );
}  

export default ChallengeStack;