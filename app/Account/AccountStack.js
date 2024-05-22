import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountScreen from './AccountScreen';
import Setting from './Setting/Setting';
import VideoRecords from './VideoRecords';
import CollectionRecords from './CollectionRecords';
import NoteRecords from './NoteRecords';
import Awards from './Awards';
import AboutApp from './AboutApp';
import Logout from './Logout';
import AccountSetting from './Setting/AccountSetting';
import Password from './Setting/Password';

const MainStack = createNativeStackNavigator();
const SettingStack = createNativeStackNavigator();


function SettingNavigator() {
  return (
      <SettingStack.Navigator screenOptions={{headerShown:false}}>
          <SettingStack.Screen name="Setting" component={Setting} />
          <SettingStack.Screen name="AccountSetting" component={AccountSetting} />
          <SettingStack.Screen name="Password" component={Password} />
      </SettingStack.Navigator>
  );
}

function VideoRecordsNavigator() {
    return (
        <SettingStack.Navigator screenOptions={{headerShown:false}}>
            <SettingStack.Screen name="VideoRecords" component={VideoRecords} />
        </SettingStack.Navigator>
    );
  }


function CollectionRecordsNavigator() {
    return (
        <SettingStack.Navigator screenOptions={{headerShown:false}}>
            <SettingStack.Screen name="CollectionRecords" component={CollectionRecords} />
        </SettingStack.Navigator>
    );
  }


  function NoteRecordsNavigator() {
    return (
        <SettingStack.Navigator screenOptions={{headerShown:false}}>
            <SettingStack.Screen name="NoteRecords" component={NoteRecords} />
        </SettingStack.Navigator>
    );
  }


function AccountStack() {
    return (
        <NavigationContainer>
            <MainStack.Navigator initialRouteName="AccountScreen" screenOptions={{headerShown:false}}>
                <MainStack.Screen name="AccountScreen" component={AccountScreen} />
                <MainStack.Screen name="SettingNavigator" component={SettingNavigator} />
                <MainStack.Screen name="VideoRecordsNavigator" component={VideoRecordsNavigator} />
                <MainStack.Screen name="CollectionRecordsNavigator" component={CollectionRecordsNavigator} />
                <MainStack.Screen name="NoteRecordsNavigator" component={NoteRecordsNavigator} />
                <MainStack.Screen name="Awards" component={Awards} />
                <MainStack.Screen name="AboutApp" component={AboutApp} />
            </MainStack.Navigator>
        </NavigationContainer>
    );
}

export default AccountStack;
