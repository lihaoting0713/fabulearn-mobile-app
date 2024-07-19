import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import Layout from './HomeScreen'; // Make sure to import the Layout from _layout.js correctly
import { Provider } from 'react-redux';
import store from './Store'; // Ensure correct import path
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StudyPackageStack from './StudyPackageStack'; // Ensure correct import path
import HomeScreen from './HomeScreen'; // Ensure correct import path
import VideoStack from './VideoStack';
import Notification from './Notifications';
import AccountStack from './AccountStack';
import ChallengeStack from './ChallengeStack';
import * as SecureStore from 'expo-secure-store';

const MainStack = createNativeStackNavigator();

export default function Index() {
  const [isLogin, setIsLogin] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loginStatus = await SecureStore.getItemAsync("isLogin");
      const logindata = await SecureStore.getItemAsync("Logined");
      setIsLogin(loginStatus === "true");
    };
    console.log("starting...")
    checkLoginStatus();
  }, []);

  if (isLogin === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const ensurelogin = async (logindata) => {
    try{
      let url = "https://schools.fabulearn.net/api/login";
      let formdata = new FormData();
      console.log("logindata:",logindata)
      const logindatajson = JSON.parse(logindata);
      formdata.append("login_id", logindatajson.login_id);
      formdata.append("password", logindatajson.password);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formdata,
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.warn(error);
    }
  }

  return (
    <Provider store={store}>
      <MainStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={isLogin?'HomeScreen':"AccountStack"}>
          <>
            <MainStack.Screen name="HomeScreen" component={HomeScreen} />
            <MainStack.Screen name="VideoStack" component={VideoStack} />
            <MainStack.Screen name="StudyPackageStack" component={StudyPackageStack} />
            <MainStack.Screen name="Notification" component={Notification} />
            <MainStack.Screen name="AccountStack" component={AccountStack} />
            <MainStack.Screen name="ChallengeStack" component={ChallengeStack} />
          </>
      </MainStack.Navigator>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
