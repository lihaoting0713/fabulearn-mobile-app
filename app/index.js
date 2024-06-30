import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Layout from './HomeScreen'; // Make sure to import the Layout from _layout.js correctly
import { Provider } from 'react-redux';
import store from './Store'; // Ensure correct import path
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StudyPackageStack from './StudyPackageStack'; // Ensure correct import path
import HomeScreen from './HomeScreen'; // Ensure correct import path



const MainStack = createNativeStackNavigator();

export default function Index() {
  return (
    <Provider store={store}>
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="HomeScreen" component={HomeScreen} />
      <MainStack.Screen name="StudyPackageStack" component={StudyPackageStack} />
      </MainStack.Navigator>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});