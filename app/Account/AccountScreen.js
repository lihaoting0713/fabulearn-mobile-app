import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, FlatList, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons, Octicons, SimpleLineIcons, Feather, AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import BottomNavBar from '../components/BottomNavBar';

function AccountScreen({navigation}) {
  let username = "陳小明";
  let usericon = "../pictures/test-user-icon.34017c5c.png";
  const [accountlist, setAccountlist] = useState([
    { text: '設定', id: "setting", icon: 'settings-outline', icontype: Ionicons, size: 30 , onPress: () => navigation.navigate('SettingNavigator')},
    { text: '影片記錄', id: "video_records", icon: 'history', icontype: Octicons, size: 30 , onPress: () => navigation.navigate('VideoRecordsNavigator')},
    { text: '收藏紀錄', id: "collection_records", icon: 'bookmark-outline', icontype: Ionicons, size: 30 , onPress: () => navigation.navigate('CollectionRecordsNavigator')},
    { text: '筆記記錄', id: "note_records", icon: 'note', icontype: SimpleLineIcons, size: 30 , onPress: () => navigation.navigate('NoteRecordsNavigator')},
    { text: '獎章', id: "awards", icon: 'award', icontype: Feather, size: 30 , onPress: () => navigation.navigate('Awards')},
    { text: '關於APP', id: "aboutapp", icon: 'apps', icontype: Octicons, size: 30 , onPress: () => navigation.navigate('AboutApp')},
    { text: '登出', id: "logout", icon: 'logout', icontype: AntDesign, size: 30 ,onPress: () => navigation.navigate('LogoutNavigator')},
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.title}>帳號</Text>
          <Image source={require(usericon)} style={styles.usericon} />
          <Text style={styles.username}>{username}</Text>

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
    marginBottom: 20,
    color: '#00A3A3',
  },
  list: {
    marginTop: 40,
    width: '100%',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 30,  
  },
  text: {
    fontSize: 20,
    marginLeft: 20,

  },
});

export default AccountScreen;
