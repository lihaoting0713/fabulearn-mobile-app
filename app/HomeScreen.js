import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './components/Header';
import BottomNavBar from './components/BottomNavBar'; 



const HomeScreen = () => {


  const [activePage, setActivePage] = useState('系統挑戰'); 
  const navigation = useNavigation();
  

  return (
    <SafeAreaView style={[styles.container, activePage === '系統挑戰' ? styles.container : styles.containerBlue]}>
      <ScrollView style={styles.content}>
      <Header />
      {activePage === '系統挑戰' ? (
          <View style={styles.container00}>
          <View style={styles.container1}>
            <View style={styles.challengebuttons}>
              <TouchableOpacity 
                style={[styles.navButton1, activePage === '系統挑戰' ? styles.activeButton : styles.inactiveButton]}
                onPress={() => setActivePage('系統挑戰')}
              >
                <Text style={[styles.navText1, activePage === '系統挑戰' ? styles.activeText : styles.inactiveText]}>系統挑戰</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.navButton2, activePage === '用戶挑戰' ? styles.activeButton : styles.inactiveButton]}
                onPress={() => setActivePage('用戶挑戰')}
              >
                <Text style={[styles.navText2, activePage === '用戶挑戰' ? styles.activeText : styles.inactiveText]}>用戶挑戰</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>詳情</Text>
            </TouchableOpacity>
          </View>
        </View>
        ) : (
          <View style={styles.container01}>
            <View style={styles.container1}>
              <View style={styles.challengebuttons}>
                <TouchableOpacity 
                  style={[styles.navButton1, activePage === '系統挑戰' ? styles.activeButton : styles.inactiveButton]}
                  onPress={() => setActivePage('系統挑戰')}
                >
                  <Text style={[styles.navText1, activePage === '系統挑戰' ? styles.activeText : styles.inactiveText]}>系統挑戰</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.navButton2, activePage === '用戶挑戰' ? styles.activeButton : styles.inactiveButton]}
                  onPress={() => setActivePage('用戶挑戰')}
                >
                  <Text style={[styles.navText2, activePage === '用戶挑戰' ? styles.activeText : styles.inactiveText]}>用戶挑戰</Text>
                </TouchableOpacity>
              </View>
            <TouchableOpacity style={styles.detailsButton1}>
              <Text style={styles.detailsButtonText}>詳情</Text>
            </TouchableOpacity>
          </View>
        </View>
        )}
        


        <View style={styles.container2}>
          <View style = {styles.watchHistory}>
            <Text style = {styles.watchHistoryText}> 觀看記錄</Text>
          </View>
          <ScrollView horizontal={true} style={styles.videoScrollView} showsHorizontalScrollIndicator={false}>
            {Array.from({ length: 10 }, (_, index) => (
              <View key={index} style={styles.videoThumbnail}>
                <Text style={styles.videoText}>Video {index + 1}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.container3}>
          <View style = {styles.watchHistory}>
            <Text style = {styles.watchHistoryText}>推薦影片</Text>
          </View>
          <ScrollView horizontal={true} style={styles.videoScrollView} showsHorizontalScrollIndicator={false}>
            {Array.from({ length: 10 }, (_, index) => (
              <View key={index} style={styles.videoThumbnail}>
                <Text style={styles.videoText}>Video {index + 1}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.container4}>
          <View style = {styles.watchHistory}>
            <Text style = {styles.watchHistoryText}>推薦影片</Text>
          </View>
          <ScrollView horizontal={true} style={styles.videoScrollView} showsHorizontalScrollIndicator={false}>
            {Array.from({ length: 10 }, (_, index) => (
              <View key={index} style={styles.videoThumbnail}>
                <Text style={styles.videoText}>Video {index + 1}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

      </ScrollView>

      <BottomNavBar />
      
    </SafeAreaView>

      
  );
};

export default HomeScreen;

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    backgroundColor: '#f05c5c',
    justifyContent: 'flex-end',

  },
  containerBlue: {
    flex: 1,
    backgroundColor: '#e0ecec',
  },

  container00: {
    backgroundColor: '#f05c5c',
    paddingBottom:'20%',
  },

  container01: {
    backgroundColor: '#e0ecec',
    paddingBottom:'20%',
  },

  container1: {
    alignItems: 'center',
  },

  challengebuttons:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '70%',
    alignItems: 'center',
    borderColor: '#ddd',
    backgroundColor: 'white',
    marginTop: '10%',
    borderRadius: 20, 
  },

  content: {
    flex: 1,  // Makes sure that the content can expand and push the navigation to the bottom
  },

  navButton1: {
    flex: 1, // Take up an equal portion of the container
    alignItems: 'center',
    justifyContent: 'center',
    padding: 13,
    backgroundColor: '#48bcbc', 
    borderTopLeftRadius: 20, // Modify challengebuttons accordingly
    borderBottomLeftRadius: 20, 
    
  },

  navButton2: {
    flex: 1, // Take up an equal portion of the container
    alignItems: 'center',
    justifyContent: 'center',
    padding: 13,
    backgroundColor: '#f0fcfc', 
    borderColor: '#ccc', 
    borderTopRightRadius: 20, 
    borderBottomRightRadius: 20, 
  },

  activeButton: {
    backgroundColor: '#48bcbc', // Blue color for the active button
    borderColor: 'transparent',
  },

  inactiveButton: {
    backgroundColor: 'white',
  },

  navText1: {
    fontSize: 15,
    color: '#f0fcfc',
    fontWeight: 'bold',
  },

  navText2: {
    fontSize: 15,
    color: '#48bcbc',
    fontWeight: 'bold',
  },

  activeText: {
    color: 'white',  // White color for active button text
  },

  inactiveText: {
    color: '#48bcbc',  // Blue color for inactive button text
  },

  container5: {
    alignItems: 'center',
  },

  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#48bcbc',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingTop: 0,
    zIndex: 1,   
  },

  challengeButtonContainer: {
    alignSelf: 'center', // Centers the button horizontally
    justifyContent: 'center',
    alignItems: 'center',
    top: -15, // Adjusts the button to protrude upwards from the nav bar
  },


  navButtonLarge: {
    backgroundColor: '#ffbc04',
    borderRadius: 50,
    width: 97,
    height: 97,
    justifyContent: 'center',
    alignItems: 'center',  
   
  },

  curveSvg: {
    position: 'absolute',
    width: '50%',
    height: 125, 
    bottom: 60, 
    
  },

  navText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  
  navTextLarge: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },

  detailsButton: {
    backgroundColor: '#f8c42c',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 13,
    marginTop: '87%',
    borderRadius: 25, // Rounded corners
    width: '25%',
  },

  detailsButton1: {
    backgroundColor: '#48bcbc',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 13,
    marginTop: '87%',
    borderRadius: 25, // Rounded corners
    width: '25%',
  },

  detailsButtonText: {
    color: 'white', // White text
    fontSize: 16,
    fontWeight: 'bold',
  },

  container2: {
    backgroundColor: '#fffcec',
    paddingTop: '10%',
    paddingBottom: '10%',
    borderTopLeftRadius: 25, 
  },

  watchHistory: {
    marginLeft: '5%',
    marginTop: '5%',
  },

  watchHistoryText: {
    fontSize: 17,
    fontWeight: 'bold',
  },

  videoScrollView: {
    marginTop: '5%',
    marginLeft: '5%',
  },

  videoThumbnail: {
    width: 200,
    height: 120,
    backgroundColor: '#333',
    borderRadius: 8,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  videoText: {
    color: 'white',
    fontSize: 16,
  },

  container3: {
    backgroundColor: '#fffcec',
    paddingBottom: '10%',
  },

  container4: {
    backgroundColor: '#fffcec',
    paddingBottom: '40%',
  },

});
