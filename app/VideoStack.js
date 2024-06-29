import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VideoLibrary from './VideoLibrary/VideoLibrary';
import PlayVideos from './VideoLibrary/PlayVideos';
import BottomNavBar from './components/BottomNavBar';

const MainStack = createNativeStackNavigator();
const SettingStack = createNativeStackNavigator();

function VideoStack() {
    return (
            <MainStack.Navigator initialRouteName="VideoLibrary" screenOptions={{headerShown:false}}>
                <MainStack.Screen name="VideoLibrary" component={VideoLibrary} initialParams={{PREVIOUSHASHTAG:null}}/>
                <MainStack.Screen name="PlayVideos" component={PlayVideos}/>
            </MainStack.Navigator>
    );
}

export default VideoStack;
