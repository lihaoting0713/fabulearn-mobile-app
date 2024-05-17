import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Layout from './HomeScreen'; // Make sure to import the Layout from _layout.js correctly

export default function Index() {
  return (
    <View style={styles.container}>
      <Layout />  
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
