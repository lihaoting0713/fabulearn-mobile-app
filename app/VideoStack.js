import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VideoLibrary from './VideoLibrary/VideoLibrary';
import Videos from './VideoLibrary/Videos';
import BottomNavBar from './components/BottomNavBar';

const MainStack = createNativeStackNavigator();
const SettingStack = createNativeStackNavigator();

function VideoStack() {
    return (
            <MainStack.Navigator initialRouteName="VideoLibrary" screenOptions={{headerShown:false}}>
                <MainStack.Screen name="VideoLibrary" component={VideoLibrary} />
                <MainStack.Screen name="Videos" component={Videos}/>
            </MainStack.Navigator>
    );
}

export default VideoStack;
