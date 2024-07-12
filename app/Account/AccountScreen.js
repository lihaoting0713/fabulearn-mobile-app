import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, FlatList, ScrollView, Image, TouchableOpacity,ActivityIndicator} from 'react-native';
import { Ionicons, Octicons, SimpleLineIcons, Feather, AntDesign } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import BottomNavBar from '../components/BottomNavBar';
import * as SecureStore from 'expo-secure-store';

function AccountScreen({navigation}) {

  let usericon = "../pictures/test-user-icon.34017c5c.png";

  const logout = async () => {
    try {
      const url = `https://schools.fabulearn.net/api/logout`;
      const response = await fetch(url);
      const testingresponse = await fetch("http://192.168.18.12/api/logout");
      const data = await response.json();
      const testingdata = await testingresponse.json();
      console.log("logout: ",data);
      console.log("testing logout: ",testingdata);
      await SecureStore.setItemAsync("isLogin", "false");
      await SecureStore.deleteItemAsync("Logined");
      console.log("isLogin status: ",await SecureStore.getItemAsync("isLogin"));
      console.log("Logined status: ",await SecureStore.getItemAsync("Logined"));
    } catch (error) {
      console.warn(error);
    }
  };
  
  const [profile, setProfile] = useState({}); 

  const getprofile = async () => {
    try {
      const url = `https://schools.fabulearn.net/api/profile`;
      const response = await fetch(url
      );
      const data = await response.json();
      console.log("profile: ",data);
      await setProfile(data.data);
    } catch (error) {
      console.warn(error);
    }
  };

  const [profileicon, setProfileicon] = useState({}); 

  const [isloading, setIsloading] = useState(true);

  const getprofileicon = async () => {
    try {
      const url = `https://schools.fabulearn.net/api/profile/icon`;
      const response = await fetch(url
      );
      const data = await response.json();
      console.log("profileicon: ",data);
      setProfileicon(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAPIdata = async () => {
    setIsloading(true);
    await getprofile();
    await getprofileicon();
    await setIsloading(false);
  }

  useEffect(()=>{
    getAPIdata();
  } , []);


  const [accountlist, setAccountlist] = useState([
    /*{ text: '設定', id: "setting", icon: 'settings-outline', icontype: Ionicons, size: 30 , onPress: () => navigation.navigate('SettingNavigator')},*/
    { text: '影片記錄', id: "video_records", icon: 'history', icontype: Octicons, size: 30 , onPress: () => navigation.navigate('VideoRecordsNavigator')},
    { text: '收藏紀錄', id: "collection_records", icon: 'bookmark-outline', icontype: Ionicons, size: 30 , onPress: () => navigation.navigate('CollectionRecordsNavigator')},
    { text: '筆記記錄', id: "note_records", icon: 'note', icontype: SimpleLineIcons, size: 30 , onPress: () => navigation.navigate('NoteRecordsNavigator')},
    { text: '獎章', id: "awards", icon: 'award', icontype: Feather, size: 30 , onPress: () => navigation.navigate('Awards')},
    { text: '關於APP', id: "aboutapp", icon: 'apps', icontype: Octicons, size: 30 , onPress: () => navigation.navigate('AboutApp')},
    { text: '登出', id: "logout", icon: 'logout', icontype: AntDesign, size: 30 ,onPress: async () => {
      await logout();
      await navigation.navigate('LogoutNavigator');
    }},
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.contentContainer}>
        {isloading?
        <ActivityIndicator size="large" color="#00A3A3" />
        :
        <View style={styles.content}>
          <Text style={styles.title}>帳號</Text>
          {
            profileicon.icon ?
            <Image source={{uri: profileicon.icon}} style={styles.usericon} />
            :
            <Image source={require(usericon)} style={styles.usericon} />
          }
          <Text style={styles.username}>{profile? profile.first_name:null} {profile? profile.last_name:null}</Text>
          <View style={styles.flatlistcontainer}>
          <FlatList
            style={styles.list}
            data={accountlist}
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View key={item.id} style={styles.itemContainer}>
                <item.icontype name={item.icon} size={item.size} color="#00A3A3" />
                <TouchableOpacity onPress={item.onPress}>
                  <Text style={styles.text}>{item.text}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          </View>
        </View>
        } 
      </ScrollView>
      <BottomNavBar navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  scroll: {
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    alignItems: 'center',
    flexGrow: 1,
  },
  content: {
    alignItems: 'center',
    width: '100%',
    flexGrow: 1,
    padding: 30,
  },
  title: {
    fontSize: 18,
    color: '#00A3A3',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  usericon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    shadowColor: '#00A3A3',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  username: {
    marginTop: 10,
    fontSize: 16,
    marginBottom: 10,
    color: '#00A3A3',
  },
  list: {
    marginTop: 10,
    width: '100%',
  },
  flatlistcontainer: {
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginRight: 60,  
  },
  text: {
    fontSize: 20,
    marginLeft: 20,

  },
});

export default AccountScreen;
