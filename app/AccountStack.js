import React ,{useState,useEffect} from 'react';
import { View, ActivityIndicator,StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountScreen from './Account/AccountScreen';
import Setting from './Account/Setting/Setting';
import VideoRecords from './Account/VideoRecords';
import CollectionRecords from './Account/CollectionRecords';
import NoteRecords from './Account/NoteRecords';
import Awards from './Account/Awards';
import AboutApp from './Account/AboutApp';
import Logout from './Account/Logout';
import AccountSetting from './Account/Setting/AccountSetting';
import Password from './Account/Setting/Password';
import CreateAccount from './Account/CreateAccount';
import ForgetPassword from './Account/ForgetPassword';
import * as SecureStore from 'expo-secure-store';



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

function LogoutNavigator() {
    return (
        <SettingStack.Navigator screenOptions={{headerShown:false, headerLeft: ()=> null}}>
            <SettingStack.Screen name="Logout" component={Logout} />
            <SettingStack.Screen name="CreateAccount" component={CreateAccount} />
            <SettingStack.Screen name="ForgetPassword" component={ForgetPassword} />
        </SettingStack.Navigator>
    );
}


function AccountStack() {
    const [isLogin, setIsLogin] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loginStatus = await SecureStore.getItemAsync("isLogin");
      setIsLogin(loginStatus === "true");
    };
    checkLoginStatus();
  }, []);

  if (isLogin === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

    return (
            <MainStack.Navigator screenOptions={{headerShown:false}} initialRouteName={isLogin?"AccountScreen":"LogoutNavigator"}>
                <MainStack.Screen name="AccountScreen" component={AccountScreen} />
                <MainStack.Screen name="SettingNavigator" component={SettingNavigator} />
                <MainStack.Screen name="VideoRecordsNavigator" component={VideoRecordsNavigator} />
                <MainStack.Screen name="CollectionRecordsNavigator" component={CollectionRecordsNavigator} />
                <MainStack.Screen name="NoteRecordsNavigator" component={NoteRecordsNavigator} />
                <MainStack.Screen name="Awards" component={Awards} />
                <MainStack.Screen name="AboutApp" component={AboutApp} />
                <MainStack.Screen name="LogoutNavigator" component={LogoutNavigator} />
            </MainStack.Navigator>
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

export default AccountStack;
